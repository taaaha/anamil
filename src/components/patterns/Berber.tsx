import * as React from "react";

/**
 * Authentic Amazigh / Berber geometric motifs — the visual grammar of
 * Aurès textiles, tattoos and pottery. Used as bands, accents and the Yaz mark.
 * All inherit `currentColor` so they tint with text color utilities.
 */

/** The Yaz (ⵣ) — the Amazigh symbol of the free human being. */
export function Yaz({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      <path
        d="M14 8a10 10 0 0 0 20 0M24 8v32M16 40h16"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A horizontal repeating band of diamonds + zigzag — a textile border. */
export function BerberBand({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 24"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      fill="none"
      aria-hidden
    >
      <defs>
        <pattern id="berber-band" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M12 2 22 12 12 22 2 12Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 8 16 12 12 16 8 12Z" fill="currentColor" />
          <path d="M0 12h2M22 12h2" stroke="currentColor" strokeWidth="1.5" />
        </pattern>
      </defs>
      <rect width="120" height="24" fill="url(#berber-band)" />
    </svg>
  );
}

/** A single diamond motif with inner cross — a stamp / bullet. */
export function BerberDiamond({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M12 1 23 12 12 23 1 12Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 6 18 12 12 18 6 12Z" stroke="currentColor" strokeWidth="1" />
      <path d="M12 10.5 13.5 12 12 13.5 10.5 12Z" fill="currentColor" />
    </svg>
  );
}

/** A tileable seamless background pattern (very subtle). */
export function BerberField({ className }: { className?: string }) {
  return (
    <svg className={className} aria-hidden>
      <defs>
        <pattern
          id="berber-field"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(0)"
        >
          <path d="M20 4 36 20 20 36 4 20Z" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="20" cy="20" r="1.5" fill="currentColor" />
          <path d="M0 20h4M36 20h4M20 0v4M20 36v4" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#berber-field)" />
    </svg>
  );
}

/** Decorative divider: line — diamond — line. */
export function BerberRule({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 16" className={className} fill="none" aria-hidden>
      <path d="M4 8h96" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M140 8h96" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M112 8 120 2 128 8 120 14Z" stroke="currentColor" strokeWidth="1.25" />
      <path d="M120 5.5 122.5 8 120 10.5 117.5 8Z" fill="currentColor" />
    </svg>
  );
}
