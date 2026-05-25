import * as React from "react";

/**
 * Refined ornamental flourish — used as a subtle brand divider.
 * Inspired by the calligraphy embellishments in the logo.
 */
export function Ornament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M2 12h60"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M138 12h60"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M68 12c4-6 12-6 16 0s12 6 16 0 12-6 16 0 12 6 16 0"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <circle cx="100" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}
