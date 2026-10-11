"use client";

import { useEffect, useRef, useState } from "react";
import { Glyph } from "./Glyph";
import { phases, type PhaseKey } from "@/content/path";
import { site } from "@/config/site";

const PHASE_MS = 5200;

/** Bar height (0..1) for a given phase, position (0..1) and time. */
function target(phase: number, x: number, t: number) {
  const wob = (f: number, s = 0) => Math.sin(x * f + t * 1.4 + s);
  switch (phase) {
    case 0: // Change: restless and uneven
      return 0.18 + 0.5 * Math.abs(wob(37, 1.3) * wob(11, 0.4) + 0.4 * wob(83, 2.2));
    case 1: // Adapt: the noise narrows into two competing waves
      return 0.22 + 0.4 * Math.abs(0.6 * wob(14) + 0.4 * wob(23, 1.7));
    case 2: // Evolve: progressive overload, each rep a little taller
      return 0.1 + 0.8 * Math.pow(x, 1.5) * (0.65 + 0.35 * Math.abs(wob(30)));
    default: // Learn: settled, symmetric, like a finished waveform
      return 0.12 + 0.72 * Math.sin(Math.PI * x) * (0.55 + 0.45 * Math.abs(wob(18, 0.5)));
  }
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState(0);
  const [manual, setManual] = useState(false);
  const phaseRef = useRef(0);
  const reduced = useRef(false);

  phaseRef.current = phase;

  // Auto-advance until the visitor picks a phase themselves.
  useEffect(() => {
    if (manual) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = mq.matches;
    if (mq.matches) return;
    const id = window.setInterval(() => setPhase((p) => (p + 1) % 4), PHASE_MS);
    return () => window.clearInterval(id);
  }, [manual]);

  // The waveform. One canvas, one rAF loop, paused when off-screen.
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = mq.matches;

    let w = 0, h = 0, bars = 0;
    let heights: number[] = [];
    let pointerX = -1;
    let raf = 0;
    let visible = true;
    const colors = { violet: "#7e42e6", soft: "#a67cf0", signal: "#e8c27a" };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors.violet = cs.getPropertyValue("--violet").trim() || colors.violet;
      colors.soft = cs.getPropertyValue("--violet-soft").trim() || colors.soft;
      colors.signal = cs.getPropertyValue("--signal").trim() || colors.signal;
    };
    readColors();
    const mo = new MutationObserver(() => { readColors(); if (reduced.current) draw(0); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-noir"] });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bars = Math.max(24, Math.floor(w / 9));
      heights = new Array(bars).fill(0.1);
      if (reduced.current) draw(0);
    };

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h);
      const gap = w / bars;
      const bw = Math.max(2, gap * 0.46);
      const mid = h / 2;
      const grad = ctx!.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, colors.violet);
      grad.addColorStop(1, colors.soft);

      for (let i = 0; i < bars; i++) {
        const x = i / (bars - 1);
        let goal = target(phaseRef.current, x, t);
        if (pointerX >= 0) {
          const d = Math.abs(i * gap - pointerX) / 140;
          goal += Math.max(0, 1 - d) * 0.22;
        }
        goal = Math.min(goal, 0.98);
        // Ease toward the goal so phase changes read as a transition, not a cut.
        heights[i] += (goal - heights[i]) * (reduced.current ? 1 : 0.07);
        const bh = Math.max(2, heights[i] * h);
        ctx!.fillStyle = grad;
        ctx!.globalAlpha = 0.35 + heights[i] * 0.65;
        ctx!.fillRect(i * gap, mid - bh / 2, bw, bh);
        // A single amber tick on the tallest bars, like a peak-hold meter.
        if (heights[i] > 0.74) {
          ctx!.globalAlpha = 1;
          ctx!.fillStyle = colors.signal;
          ctx!.fillRect(i * gap, mid - bh / 2 - 5, bw, 2);
        }
      }
      ctx!.globalAlpha = 1;
    }

    const loop = (ms: number) => {
      if (visible && !reduced.current) draw(ms / 1000);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointerX = e.clientX - r.left;
      if (e.pointerType === "mouse") {
        section.style.setProperty("--mx", `${e.clientX - section.getBoundingClientRect().left}px`);
        section.style.setProperty("--my", `${e.clientY - section.getBoundingClientRect().top}px`);
      }
    };
    const onLeave = () => { pointerX = -1; };

    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
    io.observe(section);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const onRedraw = () => draw(0);
    canvas.addEventListener("redraw", onRedraw);
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    resize();
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect(); mo.disconnect();
      canvas.removeEventListener("redraw", onRedraw);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Reduced motion: redraw once whenever the phase changes.
  useEffect(() => {
    if (reduced.current) canvasRef.current?.dispatchEvent(new Event("redraw"));
  }, [phase]);

  const current = phases[phase];

  return (
    <section ref={sectionRef} className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-top">
        <h1 id="hero-title" className="display">Software, built end to end.</h1>
        <p className="hero-lede">
          I&rsquo;m <strong>{site.name}</strong>. I build full-stack products I can ship: a self-hosted
          music player in Flask, and a bilingual gym platform in Next.js, FastAPI and PostgreSQL.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#work">See the projects</a>
          <a className="link-quiet" href="#contact">Get in touch</a>
        </div>
      </div>

      <div className="wrap signal">
        <canvas ref={canvasRef} aria-hidden="true" />
        <div className="signal-bar">
          <div className="phases" role="group" aria-label="Change, Adapt, Evolve, Learn">
            {phases.map((p, i) => (
              <button
                key={p.key}
                type="button"
                className="phase-btn"
                aria-pressed={phase === i}
                onClick={() => { setManual(true); setPhase(i); }}
              >
                <Glyph phase={p.key as PhaseKey} size={20} />
                {p.word}
              </button>
            ))}
          </div>
          <p className="signal-line" aria-live="polite">{current.line}</p>
        </div>
      </div>
    </section>
  );
}
