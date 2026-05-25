import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-clay-600 text-white hover:bg-clay-700 active:bg-clay-700 shadow-sm hover:shadow",
  secondary:
    "bg-ink-900 text-sand-50 hover:bg-ink-700 active:bg-black shadow-sm",
  ghost: "bg-transparent text-ink-700 hover:bg-ink-100",
  outline:
    "bg-transparent border border-ink-200 text-ink-900 hover:bg-ink-50 hover:border-ink-300",
  danger: "bg-rose-deep text-white hover:bg-rose-deep-dark shadow-sm",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm rounded-lg",
  md: "h-11 px-5 text-sm rounded-xl",
  lg: "h-12 sm:h-13 px-6 sm:px-7 text-base rounded-xl",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant = "primary", size = "md", ...props }, ref) {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium",
          "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-400 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50",
          "disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);
