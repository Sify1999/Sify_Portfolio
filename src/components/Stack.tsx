"use client";

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { groups, links, nodes, type Node } from "@/content/stack";

type Line = { a: string; b: string; x1: number; y1: number; x2: number; y2: number };

/** A map of what Sify actually uses. Select a node to see what it connects to and where it was used. */
export function Stack() {
  const [active, setActive] = useState<string | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const linked = useMemo(() => {
    const s = new Set<string>();
    if (!active) return s;
    for (const [a, b] of links) {
      if (a === active) s.add(b);
      if (b === active) s.add(a);
    }
    return s;
  }, [active]);

  const measure = useCallback(() => {
    const box = boxRef.current;
    if (!box) return;
    const origin = box.getBoundingClientRect();
    const next: Line[] = [];
    for (const [a, b] of links) {
      const ea = refs.current[a], eb = refs.current[b];
      if (!ea || !eb) continue;
      const ra = ea.getBoundingClientRect(), rb = eb.getBoundingClientRect();
      next.push({
        a, b,
        x1: ra.left + ra.width / 2 - origin.left, y1: ra.top + ra.height / 2 - origin.top,
        x2: rb.left + rb.width / 2 - origin.left, y2: rb.top + rb.height / 2 - origin.top,
      });
    }
    setLines(next);
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (boxRef.current) ro.observe(boxRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const sel: Node | undefined = nodes.find((n) => n.id === active);
  const byGroup = (Object.keys(groups) as Node["group"][]).map((g) => ({
    g,
    items: nodes.filter((n) => n.group === g),
  }));

  return (
    <section id="systems" className="section systems" aria-labelledby="systems-title">
      <div className="wrap">
        <h2 id="systems-title" className="display">What I actually use.</h2>
        <p className="systems-lede">
          Only technologies from my repositories. No percentages: pick one to see what it connects to
          and where I used it. Dashed borders mark what I&rsquo;m still learning.
        </p>

        <div className="constellation" ref={boxRef}>
          <svg aria-hidden="true">
            {lines.map((l) => (
              <line
                key={l.a + l.b}
                x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                data-on={active ? l.a === active || l.b === active : false}
              />
            ))}
          </svg>
          <div className="const-cols">
            {byGroup.map(({ g, items }) => (
              <div className="const-col" key={g}>
                <h3>{groups[g]}</h3>
                <ul>
                  {items.map((n) => (
                    <li key={n.id}>
                      <button
                        type="button"
                        ref={(el) => { refs.current[n.id] = el; }}
                        className={`node${n.learning ? " node-learning" : ""}`}
                        aria-pressed={active === n.id}
                        data-linked={linked.has(n.id)}
                        data-dim={!!active && active !== n.id && !linked.has(n.id)}
                        onClick={() => setActive(active === n.id ? null : n.id)}
                      >
                        {n.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="const-detail" aria-live="polite">
          {sel ? (
            <>
              <p>{sel.label}</p>
              <p>{sel.note} Used in {sel.projects.join(", ")}.</p>
            </>
          ) : (
            <p className="muted">Select a technology.</p>
          )}
        </div>
      </div>
    </section>
  );
}
