import { useEffect, useState } from 'react';
import { TICKER } from '../lib/data';
import SpotlightNavbar, { NavItem } from './SpotlightNavbar';

const TABS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'New', href: '#launches' },
  { label: 'Shop', href: '#shop' },
  { label: 'Services', href: '#services' },
];

export default function TopBar() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      let currentIdx = 0;
      TABS.forEach((t, idx) => {
        const id = t.href.replace('#', '');
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) {
          currentIdx = idx;
        }
      });
      setActiveIndex(currentIdx);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (item: NavItem, idx: number) => {
    setActiveIndex(idx);
    const id = item.href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-[#D4AF37]/30 bg-[#FFFFFF]/95 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between px-3.5 sm:px-4 py-2 sm:py-2.5 gap-2">
          {/* Brand Name only (NO logo beside it as requested) */}
          <button
            onClick={() => handleNavClick(TABS[0], 0)}
            className="flex flex-col text-left group shrink-0"
            aria-label="Scroll to home"
          >
            <span className="font-display text-[17px] sm:text-xl font-black tracking-tight text-[#121316] group-hover:text-[#8C6214] transition-colors leading-none">
              TOMHUNT
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#8C6214] font-bold mt-0.5">
              Jaipur
            </span>
          </button>

          {/* SpotlightNavbar UI */}
          <SpotlightNavbar
            items={TABS}
            activeIndex={activeIndex}
            onItemClick={handleNavClick}
            className="shrink-0"
          />
        </div>
      </div>

      {/* Marquee ticker with light luxury strip and golden dots */}
      <div className="relative overflow-hidden border-b border-[#D4AF37]/20 bg-[#F8F6F0] py-1.5 shadow-inner">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0">
              {TICKER.map((t, i) => (
                <span
                  key={`${dup}-${i}`}
                  className="flex items-center gap-3 px-4 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#1E1F26]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
