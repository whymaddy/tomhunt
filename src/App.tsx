import { useEffect, useMemo, useState } from 'react';
import { OverlayCtx } from './lib/overlay';
import Loader from './components/Loader';
import TopBar from './components/TopBar';
import HeaderCard from './components/HeaderCard';
import NewLaunches from './components/NewLaunches';
import AdBanner from './components/AdBanner';
import SpinWheel from './components/SpinWheel';
import Catalog from './components/Catalog';
import Services from './components/Services';
import Footer from './components/Footer';
import BeamBackground from './components/BeamBackground';
import StarTrails from './components/StarTrails';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [overlays, setOverlays] = useState(0);

  // DigitalSerenity interactive cursor & ripples
  const [mouseGradientStyle, setMouseGradientStyle] = useState({
    left: '0px',
    top: '0px',
    opacity: 0,
  });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 2400);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseGradientStyle({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        opacity: 1,
      });
    };
    const handleMouseLeave = () => {
      setMouseGradientStyle((prev) => ({ ...prev, opacity: 0 }));
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(
        () => setRipples((prev) => prev.filter((r) => r.id !== newRipple.id)),
        1000,
      );
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const api = useMemo(
    () => ({
      inc: () => setOverlays((n) => n + 1),
      dec: () => setOverlays((n) => Math.max(0, n - 1)),
    }),
    [],
  );

  const blurred = overlays > 0;

  return (
    <OverlayCtx.Provider value={api}>
      <Loader show={loading} />

      {/* Interactive cursor gradient follower from DigitalSerenity */}
      <div
        id="mouse-gradient-react"
        className="w-64 h-64 blur-2xl pointer-events-none fixed z-40"
        style={{
          left: mouseGradientStyle.left,
          top: mouseGradientStyle.top,
          opacity: mouseGradientStyle.opacity,
        }}
      />

      {/* Interactive click ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="ripple-effect"
          style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
        />
      ))}

      {/* Exact Beam Wordmark Background matched to Royal Golden Theme for the entire web */}
      <BeamBackground />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <StarTrails hue={43} count={180} theme="dark" className="opacity-30 mix-blend-screen" />
      </div>

      <div
        className="transition-[filter,transform] duration-300 ease-out min-h-screen"
        style={{
          filter: blurred ? 'blur(10px) saturate(0.95)' : 'none',
          transform: blurred ? 'scale(0.985)' : 'none',
        }}
      >
        {/* Main App Container: Translucent luxury frame so golden beam shines through */}
        <div className="mx-auto min-h-screen w-full max-w-md md:max-w-3xl lg:max-w-4xl bg-[#090A0E]/30 text-white shadow-[0_0_80px_rgba(0,0,0,0.85)] ring-1 ring-[#D4AF37]/30 border-x border-[#D4AF37]/25 relative overflow-hidden transition-all duration-300">
          {/* Subtle inside ambient golden glow */}
          <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />
          <TopBar />
          <main className="pb-2 relative z-10">
            <HeaderCard />
            <NewLaunches />
            <AdBanner />
            <SpinWheel />
            <Catalog />
            <Services />
          </main>
          <Footer />
        </div>
      </div>
    </OverlayCtx.Provider>
  );
}
