import { useEffect, useRef } from "react";

type Props = {
  hue?: number;
  count?: number;
  className?: string;
  theme?: "light" | "dark";
};

type Star = { r: number; a: number; s: number; h: number };

export function StarTrails({
  hue = 43, // 43 = Royal Gold
  count = 280,
  className = "",
  theme = "light",
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cv.current;
    const box = wrap.current;
    if (!canvas || !box) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0,
      h = 0,
      raf = 0,
      visible = true,
      ang = 0;
    let cx = 0.5,
      cy = 0.42,
      tx = 0.5,
      ty = 0.42;
    let stars: Star[] = [];

    const spawn = () => {
      stars = Array.from({ length: count }, () => ({
        r: Math.pow(Math.random(), 0.75),
        a: Math.random() * 6.283,
        s: 0.25 + Math.random() * 1.1,
        h: hue + (Math.random() - 0.5) * 40, // Gold to champagne to silver
      }));
    };

    const isLight = theme === "light";
    const bgFill = isLight ? "rgba(245, 245, 247, 0.05)" : "rgba(33, 33, 33, 0.04)";

    const plot = (step: number) => {
      const R = Math.hypot(w, h) * 0.9;
      for (const s of stars) {
        const a0 = s.a + ang,
          a1 = a0 + step;
        const x0 = cx * w + Math.cos(a0) * s.r * R,
          y0 = cy * h + Math.sin(a0) * s.r * R;
        const x1 = cx * w + Math.cos(a1) * s.r * R,
          y1 = cy * h + Math.sin(a1) * s.r * R;

        const alpha = isLight ? 0.35 + s.s * 0.25 : 0.5 + s.s * 0.3;
        const lightness = isLight ? 42 + s.s * 10 : 70 + s.s * 10;
        ctx.strokeStyle = `hsla(${s.h}, 75%, ${lightness}%, ${alpha})`;
        ctx.lineWidth = s.s;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }
      ang += step;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = box.clientWidth;
      h = box.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = isLight ? "#F5F5F7" : "#212121";
      ctx.fillRect(0, 0, w, h);
      spawn();
      ang = 0;
      const pre = reduce ? 400 : 120;
      for (let i = 0; i < pre; i++) plot(0.0035);
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      ctx.fillStyle = bgFill;
      ctx.fillRect(0, 0, w, h);
      plot(0.0016);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(box);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(box);

    const mv = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      tx = 0.5 + ((e.clientX - r.left) / r.width - 0.5) * 0.5;
      ty = 0.42 + ((e.clientY - r.top) / r.height - 0.5) * 0.4;
    };
    box.addEventListener("pointermove", mv);

    if (!reduce) raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      box.removeEventListener("pointermove", mv);
    };
  }, [hue, count, theme]);

  return (
    <div
      ref={wrap}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        minHeight: 200,
        backgroundColor: theme === "light" ? "#F5F5F7" : "#212121",
      }}
    >
      <canvas
        ref={cv}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}

export default StarTrails;
