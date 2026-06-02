"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";

export type CartLine = {
  productId: string;
  slug: string;
  title: string;
  price_dzd: number;
  image: string | null;
  size: string | null;
  qty: number;
};

type CartState = { lines: CartLine[] };

type Action =
  | { type: "ADD"; line: CartLine }
  | { type: "REMOVE"; key: string }
  | { type: "QTY"; key: string; qty: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; state: CartState };

const lineKey = (l: { slug: string; size: string | null }) =>
  `${l.slug}__${l.size ?? ""}`;

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;
    case "ADD": {
      const key = lineKey(action.line);
      const existing = state.lines.find((l) => lineKey(l) === key);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            lineKey(l) === key ? { ...l, qty: l.qty + action.line.qty } : l
          ),
        };
      }
      return { lines: [...state.lines, action.line] };
    }
    case "REMOVE":
      return { lines: state.lines.filter((l) => lineKey(l) !== action.key) };
    case "QTY":
      return {
        lines: state.lines.map((l) =>
          lineKey(l) === action.key
            ? { ...l, qty: Math.max(1, action.qty) }
            : l
        ),
      };
    case "CLEAR":
      return { lines: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  add: (line: CartLine) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  keyOf: (l: { slug: string; size: string | null }) => string;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "anamil_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", state: JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.lines.reduce((n, l) => n + l.qty, 0);
    const total = state.lines.reduce((s, l) => s + l.qty * l.price_dzd, 0);
    return {
      lines: state.lines,
      count,
      total,
      add: (line) => {
        dispatch({ type: "ADD", line });
        setOpen(true);
      },
      remove: (key) => dispatch({ type: "REMOVE", key }),
      setQty: (key, qty) => dispatch({ type: "QTY", key, qty }),
      clear: () => dispatch({ type: "CLEAR" }),
      keyOf: lineKey,
      open,
      setOpen,
    };
  }, [state, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
