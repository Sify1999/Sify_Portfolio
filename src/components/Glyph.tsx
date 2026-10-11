import type { PhaseKey } from "@/content/path";

/**
 * Four small geometric sigils, one per phase of Change → Adapt → Evolve → Learn.
 * Each one is built from the previous: a broken line, two arcs, a rising
 * stair, then a closed ring. Drawn with stroke only so they inherit colour.
 */
export function Glyph({ phase, size = 28 }: { phase: PhaseKey | "mark"; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "square" as const,
    "aria-hidden": true,
    focusable: false,
  };

  switch (phase) {
    case "change":
      return (
        <svg {...common}>
          <path d="M4 16h7M15 16h3M22 16h6" />
          <path d="M16 6v4M16 22v4" />
        </svg>
      );
    case "adapt":
      return (
        <svg {...common}>
          <path d="M5 22a11 11 0 0 1 11-11" />
          <path d="M27 10a11 11 0 0 1-11 11" />
          <path d="M16 11v10" />
        </svg>
      );
    case "evolve":
      return (
        <svg {...common}>
          <path d="M4 26h6v-6h6v-6h6V8h6" />
          <path d="M4 26h24" opacity="0.35" />
        </svg>
      );
    case "learn":
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="11" />
          <path d="M16 5v6M16 21v6" opacity="0.5" />
          <circle cx="16" cy="16" r="2.5" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      // The wordmark sigil: the four glyphs folded into one mark.
      return (
        <svg {...common}>
          <path d="M6 24V12l10-6 10 6v12" />
          <path d="M11 24v-7M16 24V10M21 24v-7" opacity="0.6" />
        </svg>
      );
  }
}
