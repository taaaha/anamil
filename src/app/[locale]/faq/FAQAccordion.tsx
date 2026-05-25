"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="surface-card overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full px-5 py-4 flex items-center justify-between gap-4 text-start hover:bg-sand-100 transition-colors"
            >
              <span className="font-semibold text-ink-900">{item.q}</span>
              <ChevronDown
                className={cn(
                  "size-5 text-ink-400 shrink-0 transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-ink-500 leading-relaxed border-t border-ink-100 pt-4">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
