"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";

/** The bench is a small Hollow Knight nod. It does nothing except let you rest. */
export function Footer() {
  const [resting, setResting] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("is-resting", resting);
    if (!resting) return;
    const t = window.setTimeout(() => setResting(false), 3600);
    return () => { window.clearTimeout(t); document.body.classList.remove("is-resting"); };
  }, [resting]);

  return (
    <footer className="site-footer">
      <div className="wrap">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. Built with Next.js. Source on{" "}
          <a href={site.github}>GitHub</a>.
        </p>
        <button
          type="button"
          className="bench"
          onClick={() => setResting(true)}
          aria-label="Rest on the bench"
        >
          <svg width="40" height="22" viewBox="0 0 40 22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M4 8h32M7 8v10M33 8v10M10 13h20" strokeLinecap="square" />
            <path d="M6 8c0-3 2-5 5-5h18c3 0 5 2 5 5" opacity="0.5" />
          </svg>
          {resting && <span className="bench-msg" role="status">Rested. Back to work.</span>}
        </button>
      </div>
    </footer>
  );
}
