"use client";

import { useEffect, useState } from "react";
import { toggleNoir } from "@/lib/noir";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

/** Listens for the Konami code and flips the page into noir. Always announced, always reversible. */
export function Easter() {
  const [toast, setToast] = useState("");

  useEffect(() => {
    let i = 0;
    let timer: number | undefined;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      i = k === KONAMI[i] ? i + 1 : k === KONAMI[0] ? 1 : 0;
      if (i === KONAMI.length) {
        i = 0;
        setToast(toggleNoir() ? "Noir on. Enter the code again to undo." : "Noir off.");
        window.clearTimeout(timer);
        timer = window.setTimeout(() => setToast(""), 3200);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); window.clearTimeout(timer); };
  }, []);

  return <div role="status" aria-live="polite">{toast && <div className="toast">{toast}</div>}</div>;
}
