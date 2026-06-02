"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";

export function StatusSelect({
  id,
  value,
  options,
  action,
}: {
  id: string;
  value: string;
  options: { value: string; label: string }[];
  action: (id: string, status: string) => Promise<{ ok: boolean; error?: string }>;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={value}
      disabled={pending}
      onChange={(e) => {
        const status = e.target.value;
        startTransition(async () => {
          await action(id, status);
          router.refresh();
        });
      }}
      className={cn(
        "h-9 rounded-lg border border-ink-200 bg-white px-2.5 text-sm text-ink-800 focus:outline-none focus:ring-2 focus:ring-clay-400",
        pending && "opacity-50"
      )}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
