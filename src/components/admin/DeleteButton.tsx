"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/cn";

export function DeleteButton({
  id,
  action,
  className,
}: {
  id: string;
  action: (id: string) => Promise<{ ok: boolean; error?: string }>;
  className?: string;
}) {
  const t = useTranslations("admin");
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  function onClick() {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    startTransition(async () => {
      await action(id);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1.5 rounded-lg transition-colors",
        confirming
          ? "bg-rose-deep text-white"
          : "text-rose-deep hover:bg-rose-deep/10",
        className
      )}
    >
      <Trash2 className="size-4" />
      {confirming ? t("confirmDelete") : t("delete")}
    </button>
  );
}
