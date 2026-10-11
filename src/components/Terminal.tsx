"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { projects } from "@/content/projects";
import { toggleNoir } from "@/lib/noir";

const TOGGLE_EVENT = "terminal:toggle";

/** Header button. Keeps the terminal discoverable for people who never press a key. */
export function TerminalButton() {
  return (
    <button
      type="button"
      className="nav-terminal"
      aria-haspopup="dialog"
      aria-label="Open terminal (shortcut: backtick or Control K)"
      onClick={() => window.dispatchEvent(new Event(TOGGLE_EVENT))}
    >
      <kbd>`</kbd>
      <span>terminal</span>
    </button>
  );
}

// Real CrossFit benchmark workouts, so the `wod` command is honest.
const WODS = [
  "Fran. 21-15-9 of thrusters and pull-ups, for time.",
  "Cindy. 20 minutes, as many rounds as possible of 5 pull-ups, 10 push-ups, 15 air squats.",
  "Helen. 3 rounds of a 400 m run, 21 kettlebell swings and 12 pull-ups, for time.",
  "Annie. 50-40-30-20-10 of double-unders and sit-ups, for time.",
];

type Entry = { cmd: string; out: string };

function run(raw: string): string | "__clear__" | "__exit__" {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "":
      return "";
    case "help":
      return [
        "about      who I am, briefly",
        "projects   what I have built",
        "stack      what I use",
        "path       change, adapt, evolve, learn",
        "contact    where to find me",
        "wod        a benchmark workout",
        "clear      clear this screen",
        "exit       close (or press Esc)",
        "",
        "There are a few commands not listed here.",
      ].join("\n");
    case "about":
    case "whoami":
      return "Sify. Full-stack developer. I learn by building real products and shipping them.";
    case "projects":
      return projects.map((p) => `${p.name.padEnd(12)} ${p.repo}`).join("\n");
    case "stack":
      return "Python, TypeScript, JavaScript, C#\nNext.js, React, Flask, FastAPI\nSQLite, PostgreSQL\nDocker Compose, Vercel, PythonAnywhere";
    case "path":
    case "philosophy":
      return "Change → Adapt → Evolve → Learn\nStart small, move to a new problem, make it a product, take the lesson into the next one.";
    case "contact":
      return [
        `github    ${site.github}`,
        site.telegram ? `telegram  ${site.telegram.url}` : "",
        site.email ? `email     ${site.email}` : "",
      ].filter(Boolean).join("\n");
    case "wod":
      return WODS[Math.floor(Math.random() * WODS.length)] + "\nScale it, log it, beat it next time.";
    case "roshan":
      return "Roshan respawns 8 to 11 minutes after he falls. Check the timer before you check the map.";
    case "music":
      return "Persian hip-hop is on rotation: Yas and Hichkas.";
    case "hollow":
      return "Somewhere near the bottom of the page there is a bench. Sit for a moment.";
    case "noir":
    case "batman":
    case "spiderman":
      return toggleNoir() ? "Noir on. Run it again to undo." : "Noir off.";
    case "clear":
      return "__clear__";
    case "exit":
    case "quit":
      return "__exit__";
    default:
      return `command not found: ${cmd}. Try "help".`;
  }
}

export function Terminal() {
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState<Entry[]>([
    { cmd: "", out: 'Type "help" to see what this terminal can do.' },
  ]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const toggle = () => setOpen((o) => !o);
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if ((e.key === "`" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) ||
          ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener(TOGGLE_EVENT, toggle);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(TOGGLE_EVENT, toggle);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      returnFocus.current?.focus?.();
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [log, open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const out = run(value);
    if (out === "__clear__") setLog([]);
    else if (out === "__exit__") close();
    else setLog((l) => [...l, { cmd: value, out }]);
    setValue("");
  };

  // Keep Tab inside the dialog and close on Escape.
  const onDialogKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.stopPropagation(); close(); return; }
    if (e.key !== "Tab") return;
    const first = inputRef.current, last = closeRef.current;
    if (!first || !last) return;
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  if (!open) return null;

  return (
    <div className="term-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="term" role="dialog" aria-modal="true" aria-label="Terminal" onKeyDown={onDialogKey}>
        <div className="term-head">
          <span>sify@portfolio</span>
          <button ref={closeRef} type="button" className="term-close" onClick={close} aria-label="Close terminal">esc</button>
        </div>
        <div className="term-log" ref={logRef} aria-live="polite">
          {log.map((l, i) => (
            <div key={i}>
              {l.cmd && <pre className="cmd">{l.cmd}</pre>}
              {l.out && <pre>{l.out}</pre>}
            </div>
          ))}
        </div>
        <form className="term-form" onSubmit={submit}>
          <span aria-hidden="true">%</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Command"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}
