import * as React from "react";

export const clamp = (v: number, lo: number, hi: number): number =>
  v < lo ? lo : v > hi ? hi : v;

export const hexToRgb = (
  hex: string,
  fallback: string = "212, 175, 55",
): string => {
  const m = /^#?([\da-f]{3}|[\da-f]{6})$/i.exec((hex || "").trim());
  if (!m) return fallback;
  const h = m[1].length === 3 ? m[1].replace(/./g, (c) => c + c) : m[1];
  const n = parseInt(h, 16);
  return ((n >> 16) & 255) + ", " + ((n >> 8) & 255) + ", " + (n & 255);
};

export const fitSize = (
  measuredAt100: number,
  target: number,
  cap: number,
): number => {
  if (!(measuredAt100 > 0) || !(target > 0)) return 0;
  const size = (100 * target) / measuredAt100;
  return cap > 0 ? Math.min(size, cap) : size;
};

export const beamTarget = (
  u: number,
  lo: number = 30,
  hi: number = 82,
): number => lo + (hi - lo) * clamp(Number.isFinite(u) ? u : 0.5, 0, 1);

export const drift = (
  t: number,
  centre: number = 58,
  amp: number = 9,
): number =>
  centre +
  amp * (0.7 * Math.sin(t * 0.21) + 0.3 * Math.sin(t * 0.077 + 1.3));

export const approach = (
  from: number,
  to: number,
  k: number,
  dt: number,
): number =>
  to + (from - to) * Math.pow(1 - clamp(k, 0, 1), clamp(dt, 0, 0.1) * 60);

export const baselineAt = (ascent: number, descent: number): number => {
  if (!(ascent > 0) || !(descent >= 0)) return 0.8;
  return clamp(((100 - ascent - descent) / 2 + ascent) / 100, 0.5, 1.2);
};

export const wordHeight = (
  fontSize: number,
  baseline: number,
  cut: number,
): number =>
  Math.max(
    0,
    fontSize * (baseline + clamp(Number.isFinite(cut) ? cut : 0, -0.4, 0.4)),
  );

export type SocialIcon =
  | "x"
  | "linkedin"
  | "youtube"
  | "instagram"
  | "github"
  | "whatsapp"
  | "phone";

export type FooterSocial = {
  label: string;
  href?: string;
  icon: SocialIcon | React.ReactNode;
};

export type FooterLink = { label: string; href?: string };
export type FooterColumn = { title: string; links: FooterLink[] };
export type FooterCredit = {
  lead?: string;
  label: string;
  href?: string;
  tail?: string;
};

export type BeamWordmarkFooterProps = {
  brand?: string;
  wordmark?: string;
  company?: string;
  year?: number;
  socials?: FooterSocial[];
  credits?: FooterCredit[];
  columns?: FooterColumn[];
  onLinkClick?: (label: string, href?: string) => void;
  cut?: number;
  background?: string;
  ink?: string;
  muted?: string;
  accent?: string;
  wordTop?: string;
  wordFoot?: string;
  fontSans?: string;
  wordWeight?: number;
  animate?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const ICONS: Record<string, React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="17.1" cy="6.9" r=".6" fill="currentColor" stroke="none" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
};

const CSS =
  ".bwf{position:relative;isolation:isolate;overflow:hidden;container-type:inline-size;background:var(--bwf-bg);color:var(--bwf-ink);font-family:var(--bwf-sans);-webkit-font-smoothing:antialiased;touch-action:pan-y}" +
  ":where(.bwf) a{color:inherit;text-decoration:none}" +
  ":where(.bwf) button{font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer}" +
  ":where(.bwf) ul{list-style:none;margin:0;padding:0}" +
  ":where(.bwf) p{margin:0}" +
  ".bwf svg{max-width:none;display:block}" +
  ".bwf .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}" +
  ".bwf-rule{position:absolute;left:0;right:0;top:0;height:1px;z-index:3;background:linear-gradient(90deg,rgba(var(--bwf-acc),.15),rgba(var(--bwf-acc),.75) var(--bwf-b),rgba(var(--bwf-acc),.15))}" +
  ".bwf-sky{position:absolute;inset:0;z-index:0;pointer-events:none}" +
  ".bwf-wash{position:absolute;inset:0;background:radial-gradient(120% 90% at 8% 0%,rgba(var(--bwf-acc),.22),transparent 55%),radial-gradient(90% 70% at 92% 8%,rgba(var(--bwf-acc),.16),transparent 60%),linear-gradient(180deg,rgba(var(--bwf-acc),.08),transparent 70%)}" +
  ".bwf-bands{position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(var(--bwf-acc),.05) 0 1.6cqw,transparent 1.6cqw 4.2cqw);-webkit-mask-image:linear-gradient(100deg,#000 0%,transparent 55%);mask-image:linear-gradient(100deg,#000 0%,transparent 55%);opacity:.9}" +
  ".bwf-beam{position:absolute;inset:0;filter:blur(calc(1px + 1.6cqw));background:linear-gradient(var(--bwf-ang),transparent calc(var(--bwf-b) - 11%),rgba(var(--bwf-acc),.12) calc(var(--bwf-b) - 5%),rgba(var(--bwf-acc),.45) var(--bwf-b),rgba(var(--bwf-acc),.1) calc(var(--bwf-b) + 4%),transparent calc(var(--bwf-b) + 9%)),linear-gradient(var(--bwf-ang),transparent calc(var(--bwf-b) - 34%),rgba(var(--bwf-acc),.12) calc(var(--bwf-b) - 27%),transparent calc(var(--bwf-b) - 20%))}" +
  ".bwf-glow{position:absolute;inset:0;opacity:var(--bwf-g);background:radial-gradient(circle 26cqw at var(--bwf-px) var(--bwf-py),rgba(var(--bwf-acc),.24),transparent 70%)}" +
  ".bwf-grain{position:absolute;inset:0;opacity:.08;mix-blend-mode:overlay;background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")}" +
  ".bwf-inner{position:relative;z-index:2;box-sizing:border-box;max-width:1120px;margin:0 auto;padding:clamp(20px,4cqw,36px) clamp(16px,4cqw,48px) 0;display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);column-gap:clamp(16px,3cqw,32px);row-gap:16px}" +
  ".bwf-label{font-size:11px;line-height:1;letter-spacing:.08em;text-transform:uppercase;color:rgb(var(--bwf-acc));padding-bottom:10px;position:relative;display:block}" +
  ".bwf-label::after{content:'';position:absolute;left:0;right:0;bottom:0;height:1px;background:linear-gradient(90deg,rgba(var(--bwf-acc),.65),rgba(var(--bwf-acc),.2));transform-origin:0 50%;transform:scaleX(var(--bwf-line,1));transition:transform 1.1s cubic-bezier(.2,.7,.1,1) var(--bwf-d,0ms)}" +
  ".bwf[data-in='false'] .bwf-label::after{--bwf-line:0}" +
  ".bwf-col{min-width:0}" +
  ".bwf-fade{transition:opacity .9s ease var(--bwf-d,0ms),translate .9s cubic-bezier(.2,.7,.1,1) var(--bwf-d,0ms)}" +
  ".bwf[data-in='false'] .bwf-fade{opacity:0;translate:0 14px}" +
  ".bwf-socials{display:flex;gap:12px;margin-top:12px}" +
  ".bwf-soc{position:relative;width:34px;height:34px;display:grid;place-items:center;border-radius:8px;color:rgba(var(--bwf-ink-rgb),.75);background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.02));box-shadow:inset 0 0 0 1px rgba(255,255,255,.12),0 4px 10px rgba(0,0,0,.4);transition:color .25s,box-shadow .35s,translate .35s cubic-bezier(.2,.8,.2,1),background .35s}" +
  ".bwf-soc svg{width:16px;height:16px}" +
  ".bwf-soc:hover,.bwf-soc:focus-visible{color:#fff;translate:0 -2px;background:linear-gradient(180deg,rgba(var(--bwf-acc),.4),rgba(var(--bwf-acc),.15));box-shadow:inset 0 0 0 1px rgba(var(--bwf-acc),.9),0 8px 20px rgba(var(--bwf-acc),.5)}" +
  ".bwf-tip{position:absolute;z-index:5;left:50%;top:calc(100% + 7px);translate:-50% -4px;white-space:nowrap;font-size:10px;line-height:1;padding:5px 7px;border-radius:4px;background:rgba(var(--bwf-acc),.95);color:#212121;font-weight:700;opacity:0;pointer-events:none;transition:opacity .2s,translate .25s}" +
  ".bwf-tip::after{content:'';position:absolute;left:50%;bottom:100%;margin-left:-4px;border:4px solid transparent;border-bottom-color:rgba(var(--bwf-acc),.95)}" +
  ".bwf-soc:hover .bwf-tip{opacity:1;translate:-50% 0}" +
  ".bwf-credits{margin-top:16px;font-size:12.5px;line-height:1.5;color:var(--bwf-muted)}" +
  ".bwf-credits b{font-weight:600;color:rgb(var(--bwf-acc))}" +
  ".bwf-links{margin-top:10px;display:flex;flex-direction:column;gap:2px}" +
  ".bwf-link{position:relative;display:inline-flex;align-items:center;gap:8px;padding:5px 0;font-size:13.5px;color:rgba(var(--bwf-ink-rgb),.8);transition:color .25s}" +
  ".bwf-link:hover{color:rgb(var(--bwf-acc))}" +
  ".bwf-word{position:relative;z-index:1;overflow:hidden;margin-top:clamp(14px,3cqw,32px)}" +
  ".bwf-word-box{padding:0 clamp(12px,3cqw,36px);max-width:1120px;margin:0 auto;box-sizing:border-box;text-align:center}" +
  ".bwf-word-in{display:inline-flex;white-space:nowrap;font-weight:var(--bwf-ww);line-height:1;letter-spacing:-.04em;user-select:none;-webkit-user-select:none}" +
  ".bwf-lw{display:inline-block;translate:0 0;transition:translate 1.25s cubic-bezier(.16,.84,.2,1) var(--bwf-d,0ms)}" +
  ".bwf[data-in='false'] .bwf-lw{translate:0 85%}" +
  ".bwf-l{display:inline-block;cursor:pointer;color:transparent;-webkit-background-clip:text;background-clip:text;background-repeat:no-repeat;background-size:var(--bwf-rw) var(--bwf-rh);background-position:calc(var(--bwf-x) * -1) calc(var(--bwf-y) * -1);" +
  "background-image:radial-gradient(circle 22cqw at var(--bwf-px) var(--bwf-py),rgba(var(--bwf-lit),calc(var(--bwf-g) * .9)),transparent 70%)," +
  "linear-gradient(var(--bwf-ang),transparent calc(var(--bwf-b) - 9%),rgba(var(--bwf-lit),.65) calc(var(--bwf-b) - 1.5%),rgba(var(--bwf-lit),.85) var(--bwf-b),rgba(var(--bwf-lit),.3) calc(var(--bwf-b) + 3.5%),transparent calc(var(--bwf-b) + 8%))," +
  "linear-gradient(180deg,var(--bwf-wt) var(--bwf-top),var(--bwf-wf) var(--bwf-bot));" +
  "transition:transform .5s cubic-bezier(.2,.9,.25,1.2),filter .4s;transform-origin:50% 100%}" +
  ".bwf-l:hover{transform:translateY(-.045em);filter:brightness(1.4) saturate(1.2)}" +
  ".bwf-l.is-hop{animation:bwf-hop .75s cubic-bezier(.2,.8,.2,1)}" +
  "@keyframes bwf-hop{0%{transform:translateY(0) scale(1,1)}18%{transform:translateY(.02em) scale(1.06,.9)}45%{transform:translateY(-.14em) scale(.97,1.05)}70%{transform:translateY(.01em) scale(1.02,.97)}100%{transform:translateY(-.045em) scale(1,1)}}" +
  ".bwf-foot{position:absolute;left:0;right:0;bottom:0;height:34%;z-index:2;pointer-events:none;background:linear-gradient(180deg,transparent,rgba(var(--bwf-bg-rgb),.6) 55%,var(--bwf-bg))}" +
  "@media (max-width: 330px){.bwf-inner{grid-template-columns:1fr;row-gap:16px}}" +
  "@media (prefers-reduced-motion: reduce){.bwf .bwf-lw,.bwf .bwf-fade,.bwf .bwf-label::after,.bwf .bwf-l,.bwf .bwf-soc,.bwf .bwf-link{transition:none!important;animation:none!important}.bwf[data-in='false'] .bwf-lw,.bwf[data-in='false'] .bwf-fade{translate:none;opacity:1}.bwf[data-in='false'] .bwf-label::after{--bwf-line:1}}";

const SANS =
  '"Bricolage Grotesque", "Outfit", ui-sans-serif, system-ui, sans-serif';

export default function BeamWordmarkFooter({
  brand = "TOMHUNT",
  wordmark = "TOMHUNT",
  company = "Tomhunt Mobile Store",
  year = new Date().getFullYear(),
  socials = [],
  credits,
  columns = [],
  onLinkClick,
  cut = -0.06,
  background = "#141519",
  ink = "#FFFFFF",
  muted = "#A0A0A0",
  accent = "#D4AF37", // Royal Gold from Logo
  wordTop = "#F5D061", // Bright Crown Gold
  wordFoot = "#AA771C", // Deep Metallic Gold
  fontSans = SANS,
  wordWeight = 900,
  animate = true,
  className = "",
  children,
}: BeamWordmarkFooterProps) {
  const word = (wordmark ?? brand).trim() || brand;
  const letters = React.useMemo(() => Array.from(word), [word]);

  const rootRef = React.useRef<HTMLElement>(null);
  const wordRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState(0);
  const [base, setBase] = React.useState(0.8);
  const [seen, setSeen] = React.useState(false);

  const ptr = React.useRef({ u: 0.5, x: 0, y: 0, inside: false });

  React.useLayoutEffect(() => {
    const root = rootRef.current;
    const box = wordRef.current;
    const inner = innerRef.current;
    if (!root || !box || !inner) return;
    let frame = 0;
    const fit = () => {
      const wb = inner.parentElement ?? box;
      const pad = parseFloat(getComputedStyle(wb).paddingLeft) || 0;
      const target = wb.clientWidth - pad * 2;
      inner.style.fontSize = "100px";
      const measured = inner.offsetWidth;
      setBase(0.8);
      const next = fitSize(measured, target, target * 0.44);
      inner.style.fontSize = next + "px";
      setSize(next);
      place();
    };
    const place = () => {
      const r = root.getBoundingClientRect();
      root.style.setProperty("--bwf-rw", r.width + "px");
      root.style.setProperty("--bwf-rh", r.height + "px");
      const spans = inner.querySelectorAll<HTMLElement>(".bwf-l");
      let top = 0;
      spans.forEach((s, i) => {
        let x = 0;
        let y = 0;
        let el: HTMLElement | null = s;
        while (el && el !== root) {
          x += el.offsetLeft;
          y += el.offsetTop;
          el = el.offsetParent as HTMLElement | null;
        }
        s.style.setProperty("--bwf-x", x + "px");
        s.style.setProperty("--bwf-y", y + "px");
        if (i === 0) top = y;
      });
      root.style.setProperty("--bwf-top", top + "px");
      root.style.setProperty(
        "--bwf-bot",
        top + (parseFloat(inner.style.fontSize) || 0) * 0.92 + "px",
      );
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };
    fit();
    const ro = new ResizeObserver(schedule);
    ro.observe(root);
    let alive = true;
    document.fonts?.ready.then(() => alive && schedule());
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [word, fontSans, wordWeight]);

  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setSeen(true);
      },
      { threshold: 0.1 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReduced(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const set = (b: number, px: number, py: number, g: number) => {
      root.style.setProperty("--bwf-b", b.toFixed(2) + "%");
      root.style.setProperty("--bwf-px", px.toFixed(1) + "px");
      root.style.setProperty("--bwf-py", py.toFixed(1) + "px");
      root.style.setProperty("--bwf-g", g.toFixed(3));
    };
    const still = reduced || !animate;
    if (still || !visible) {
      const p = ptr.current;
      set(58, p.x, p.y, p.inside ? 1 : 0);
      return;
    }
    let raf = 0;
    let last = performance.now();
    let t = last / 1000;
    let b = 58;
    let px = ptr.current.x;
    let py = ptr.current.y;
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
  }, [reduced, animate, visible]);

  const onPointer = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const p = ptr.current;
    p.x = e.clientX - r.left;
    p.y = e.clientY - r.top;
    p.u = r.width ? p.x / r.width : 0.5;
    p.inside = e.type !== "pointerleave";
  };

  const hop = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (reduced) return;
    const el = e.currentTarget;
    el.classList.remove("is-hop");
    void el.offsetWidth;
    el.classList.add("is-hop");
  };

  const vars = {
    "--bwf-bg": background,
    "--bwf-bg-rgb": hexToRgb(background, "33, 33, 33"),
    "--bwf-ink": ink,
    "--bwf-ink-rgb": hexToRgb(ink, "255, 255, 255"),
    "--bwf-muted": muted,
    "--bwf-acc": hexToRgb(accent, "212, 175, 55"),
    "--bwf-lit": hexToRgb(accent, "212, 175, 55"),
    "--bwf-wt": wordTop,
    "--bwf-wf": wordFoot,
    "--bwf-sans": fontSans,
    "--bwf-ww": String(wordWeight),
    "--bwf-ang": "118deg",
    "--bwf-b": "58%",
    "--bwf-px": "50%",
    "--bwf-py": "50%",
    "--bwf-g": "0",
    "--bwf-top": "0px",
    "--bwf-bot": "100%",
  } as React.CSSProperties;

  let d = 0;
  const delay = () => ({ "--bwf-d": (d += 70) + "ms" }) as React.CSSProperties;

  return (
    <footer
      ref={rootRef}
      className={"bwf " + className}
      style={vars}
      data-in={seen || reduced ? "true" : "false"}
      onPointerMove={onPointer}
      onPointerEnter={onPointer}
      onPointerLeave={onPointer}
    >
      <style>{CSS}</style>
      <div className="bwf-rule" aria-hidden="true" />
      <div className="bwf-sky" aria-hidden="true">
        <div className="bwf-wash" />
        <div className="bwf-bands" />
        <div className="bwf-beam" />
        <div className="bwf-glow" />
        <div className="bwf-grain" />
      </div>

      {/* Children content (such as Owner Profile, Store details, quick links) */}
      {children}

      <div className="bwf-inner">
        <div className="bwf-col">
          <p className="bwf-label" style={delay()}>
            © {year} {company}
          </p>
          <div className="bwf-credits">
            <p className="bwf-fade" style={delay()}>
              <b>TOMHUNT</b> · Flagship Mobile Store
            </p>
            <p className="bwf-fade mt-1 text-[11px]" style={delay()}>
              Pratap Nagar, Jaipur, Rajasthan · 302033
            </p>
          </div>
          {socials.length > 0 && (
            <ul className="bwf-socials">
              {socials.map((s, i) => (
                <li key={s.label + i} className="bwf-fade" style={delay()}>
                  <a
                    className="bwf-soc"
                    href={s.href || "#"}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {typeof s.icon === "string" ? ICONS[s.icon] : s.icon}
                    <span className="bwf-tip" aria-hidden="true">
                      {s.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {columns.map((col, ci) => (
          <nav key={col.title + ci} className="bwf-col" aria-label={col.title}>
            <p className="bwf-label" style={delay()}>
              {col.title}
            </p>
            <ul className="bwf-links">
              {col.links.map((l, li) => (
                <li key={l.label + li} className="bwf-fade" style={delay()}>
                  <a
                    className="bwf-link"
                    href={l.href || "#"}
                    onClick={(e) => {
                      if (!l.href || l.href === "#") e.preventDefault();
                      onLinkClick?.(l.label, l.href);
                    }}
                  >
                    <span>{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Wordmark with Golden Beam and Hop animation */}
      <div
        ref={wordRef}
        className="bwf-word"
        style={{
          height: size
            ? wordHeight(size, base, cut)
            : "calc(" + (0.8 + cut) * 26 + "cqw)",
        }}
      >
        <p className="sr-only">{word}</p>
        <div className="bwf-word-box">
          <div ref={innerRef} className="bwf-word-in" aria-hidden="true">
            {letters.map((ch, i) => (
              <span
                key={i}
                className="bwf-lw"
                style={
                  { "--bwf-d": 260 + i * 75 + "ms" } as React.CSSProperties
                }
              >
                <span
                  className="bwf-l"
                  onClick={hop}
                  onAnimationEnd={(e) =>
                    e.currentTarget.classList.remove("is-hop")
                  }
                >
                  {ch === " " ? " " : ch}
                </span>
              </span>
            ))}
          </div>
        </div>
        <div className="bwf-foot" aria-hidden="true" />
      </div>
    </footer>
  );
}
