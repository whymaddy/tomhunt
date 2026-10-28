import { Sparkles } from 'lucide-react';
import { LAUNCH_IMAGES } from '../lib/data';
import TiltedGridHero from './TiltedGridHero';

export default function NewLaunches() {
  const heroImages = LAUNCH_IMAGES.map((src, i) => ({
    src,
    alt: `Smartphone launch ${i + 1}`,
  }));

  return (
    <section id="launches" className="mt-8 scroll-mt-24 px-3.5 sm:px-4">
      {/* Header */}
      <div className="flex items-end justify-between px-1">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/45 bg-[#FFFFFF]/95 px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-widest text-[#7A520E] uppercase shadow-sm">
            <Sparkles size={11} className="text-[#8C6214]" /> Fresh Arrivals
          </span>
          <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-white drop-shadow-sm">
            New Launches
          </h2>
        </div>
        <p className="font-mono text-[10px] text-[#F5D061] font-semibold">Curved 3D Gallery</p>
      </div>

      {/* Pure horizontal curved 3D stream of smartphone photos in 3:4 aspect ratio */}
      <div className="relative mt-3 h-[270px] sm:h-[320px] w-full overflow-hidden rounded-2xl">
        <TiltedGridHero
          images={heroImages}
          speed={4}
          tileHeight={92}
          aspectRatio={3 / 4}
          curve={70}
          gap={10}
          fade={16}
          className="h-full w-full"
        />

        {/* Ambient top/bottom hairline */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      </div>
    </section>
  );
}
