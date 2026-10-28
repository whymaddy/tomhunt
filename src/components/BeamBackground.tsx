import * as React from "react";

export const clamp = (v: number, lo: number, hi: number): number =>
  v < lo ? lo : v > hi ? hi : v;

/** Where the beam sits (% across the section) for a pointer at `u` (0 → 1 across). */
export const beamTarget = (
  u: number,
  lo: number = 25,
  hi: number = 85,
): number => lo + (hi - lo) * clamp(Number.isFinite(u) ? u : 0.5, 0, 1);

/** The beam's idle sway: two slow, unrelated sines so it never visibly loops. */
export const drift = (
  t: number,
  centre: number = 55,
  amp: number = 10,
): number =>
  centre +
  amp * (0.7 * Math.sin(t * 0.21) + 0.3 * Math.sin(t * 0.077 + 1.3));

/** Frame-rate independent ease toward a target: `k` is the fraction closed per 1/60s. */
export const approach = (
  from: number,
  to: number,
  k: number,
  dt: number,
): number =>
  to + (from - to) * Math.pow(1 - clamp(k, 0, 1), clamp(dt, 0, 0.1) * 60);

export interface BeamBackgroundProps {
  className?: string;
  animate?: boolean;
}

export default function BeamBackground({
  className = "",
  animate = true,
}: BeamBackgroundProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const ptr = React.useRef({ u: 0.5, x: 0, y: 0, inside: false });

  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReduced(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  // Listen to window-level pointer events so moving pointer anywhere moves the beam & glow
  React.useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth || 1;
      ptr.current.x = e.clientX;
      ptr.current.y = e.clientY;
      ptr.current.u = e.clientX / w;
      ptr.current.inside = true;
    };

    const onLeave = () => {
      ptr.current.inside = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const set = (b: number, px: number, py: number, g: number) => {
      root.style.setProperty("--beam-b", b.toFixed(2) + "%");
      root.style.setProperty("--beam-px", px.toFixed(1) + "px");
      root.style.setProperty("--beam-py", py.toFixed(1) + "px");
      root.style.setProperty("--beam-g", g.toFixed(3));
    };

    const still = reduced || !animate;
    if (still) {
      set(55, window.innerWidth / 2, window.innerHeight / 2, 0);
      return;
    }

    let raf = 0;
    let last = performance.now();
    let t = last / 1000;
    let b = 55;
    let px = window.innerWidth / 2;
    let py = window.innerHeight / 2;
    let g = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      t += dt;
      const p = ptr.current;
      const idle = drift(t);
      const target = p.inside ? beamTarget(p.u) * 0.75 + idle * 0.25 : idle;
      b = approach(b, target, 0.035, dt);
      px = approach(px, p.x, 0.16, dt);
      py = approach(py, p.y, 0.16, dt);
      g = approach(g, p.inside ? 1 : 0, 0.06, dt);
      set(b, px, py, g);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, animate]);

  return (
    <div
      ref={rootRef}
      className={`fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#090A0E] ${className}`}
      style={
        {
          "--beam-acc": "212, 175, 55", // Royal Gold
          "--beam-ang": "118deg",
          "--beam-b": "55%",
          "--beam-px": "50vw",
          "--beam-py": "50vh",
          "--beam-g": "0",
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {/* 1. Golden Wash: Luxury ambient radial & vertical glows */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(120% 90% at 8% 0%, rgba(var(--beam-acc), 0.22), transparent 55%),
            radial-gradient(90% 70% at 92% 8%, rgba(var(--beam-acc), 0.16), transparent 60%),
            linear-gradient(180deg, rgba(var(--beam-acc), 0.08), transparent 70%)
          `,
        }}
      />

      {/* 2. Repeating Vertical Subtle Golden Bands */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(var(--beam-acc), 0.055) 0 24px, transparent 24px 64px)",
          WebkitMaskImage: "linear-gradient(100deg, #000 0%, transparent 60%)",
          maskImage: "linear-gradient(100deg, #000 0%, transparent 60%)",
        }}
      />

      {/* 3. The Golden Diagonal Light Beam: Shaft of light drifting and tracking pointer */}
      <div
        className="absolute inset-0"
        style={{
          filter: "blur(24px)",
          background: `
            linear-gradient(
              var(--beam-ang),
              transparent calc(var(--beam-b) - 12%),
              rgba(var(--beam-acc), 0.12) calc(var(--beam-b) - 5%),
              rgba(var(--beam-acc), 0.45) var(--beam-b),
              rgba(var(--beam-acc), 0.10) calc(var(--beam-b) + 4%),
              transparent calc(var(--beam-b) + 10%)
            ),
            linear-gradient(
              var(--beam-ang),
              transparent calc(var(--beam-b) - 34%),
              rgba(var(--beam-acc), 0.12) calc(var(--beam-b) - 27%),
              transparent calc(var(--beam-b) - 20%)
            )
          `,
        }}
      />

      {/* 4. Soft Pointer Glow that follows the mouse/finger */}
      <div
        className="absolute inset-0"
        style={{
          opacity: "var(--beam-g)",
          background:
            "radial-gradient(circle 380px at var(--beam-px) var(--beam-py), rgba(var(--beam-acc), 0.22), transparent 70%)",
        }}
      />

      {/* 5. Subtle Grain Overlay Texture */}
      <div
        className="absolute inset-0 opacity-[0.09] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
        }}
      />
    </div>
  );
}
