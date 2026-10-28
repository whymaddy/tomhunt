import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Instagram, MessageCircle, Navigation, Clock, ShieldCheck } from 'lucide-react';
import { SHOP } from '../lib/data';
import Logo from './Logo';

const actions = [
  { label: 'Instagram', href: SHOP.instagram, Icon: Instagram, color: 'text-[#E1306C]' },
  { label: 'WhatsApp', href: SHOP.whatsapp, Icon: MessageCircle, color: 'text-[#1FB555]' },
  { label: 'Call', href: `tel:${SHOP.phoneTel}`, Icon: Phone, color: 'text-[#8C6214]' },
  { label: 'Maps', href: SHOP.maps, Icon: Navigation, color: 'text-[#3E74DD]' },
];

export default function HeaderCard() {
  useEffect(() => {
    // Word animation: reveals words from bottom to top with blur effect ("niche se uper")
    const animateWords = () => {
      const wordElements = document.querySelectorAll('.hero-word-animate');
      wordElements.forEach((word) => {
        const delay = parseInt(word.getAttribute('data-delay') || '0', 10);
        setTimeout(() => {
          if (word) {
            (word as HTMLElement).style.animation = 'word-appear 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards';
          }
        }, delay);
      });
    };

    const t = setTimeout(animateWords, 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" className="relative px-3.5 sm:px-4 pt-3 sm:pt-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-[#D4AF37]/45 bg-gradient-to-b from-[#FFFFFF] via-[#FAF9F6] to-[#F3EFE9] p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)] text-[#121316]"
      >
        {/* Subtle Light Luxury Grid Background Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `radial-gradient(rgba(212, 175, 55, 0.4) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Ambient Top Golden Glow */}
        <div className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-[#D4AF37]/15 blur-3xl" />

        {/* Hero Main Content: Left side text/details, Right side TH logo badge */}
        <div className="relative z-10 flex items-center justify-between gap-3">
          {/* Left Column: Brand name, tagline, address, call */}
          <div className="flex-1 min-w-0">
            {/* Brand Name with niche se uper animation and luxury dark gold text */}
            <h1 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight leading-none">
              <span
                className="hero-word-animate word-animate inline-block bg-gradient-to-r from-[#121316] via-[#7A520E] to-[#121316] bg-clip-text text-transparent"
                data-delay="150"
              >
                TOMHUNT
              </span>
            </h1>

            {/* Tagline words with bottom-to-top reveal */}
            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px] sm:text-xs font-mono tracking-wider text-[#5A5B64] uppercase">
              <span className="hero-word-animate word-animate text-[#8C6214] font-bold" data-delay="300">Premium</span>
              <span className="hero-word-animate word-animate" data-delay="450">Mobile</span>
              <span className="hero-word-animate word-animate" data-delay="600">Showroom</span>
            </div>

            {/* Address pill badge */}
            <div className="mt-2.5 flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/45 bg-[#D4AF37]/15 px-2.5 py-0.5 font-mono text-[9px] sm:text-[10px] font-bold tracking-wider text-[#7A520E] uppercase shadow-sm">
                <MapPin size={10} className="shrink-0 text-[#8C6214]" /> Pratap Nagar, Jaipur
              </span>
            </div>

            {/* Phone Hotline Link */}
            <a
              href={`tel:${SHOP.phoneTel}`}
              className="mt-2.5 inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-mono font-bold text-[#121316] hover:text-[#8C6214] transition-colors"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-[#121316] shadow-sm">
                <Phone size={10} strokeWidth={2.5} />
              </span>
              <span>{SHOP.phoneDisplay}</span>
            </a>
          </div>

          {/* Right Column: Large Circular TH Logo Badge with Royal Gold Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 relative"
          >
            <div className="relative rounded-full p-1 bg-gradient-to-tr from-[#996515] via-[#D4AF37] to-[#F5D061] shadow-[0_8px_24px_rgba(212,175,55,0.35)]">
              <Logo size={78} withGlow={false} className="shadow-inner" />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[#D4AF37]/25 blur-md -z-10" />
          </motion.div>
        </div>

        {/* Address and Timings Detail Strip */}
        <div className="relative z-10 mt-3.5 rounded-2xl border border-[#D4AF37]/30 bg-[#FFFFFF]/90 p-3 shadow-sm">
          <p className="text-[11.5px] sm:text-xs leading-snug font-medium text-[#2D2E36]">
            {SHOP.addressLine1}, {SHOP.addressLine2}
          </p>

          <div className="mt-2 flex items-center justify-between border-t border-[#D4AF37]/20 pt-2 text-[10.5px] text-[#555660]">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock size={11} className="text-[#8C6214]" /> {SHOP.hours}
            </span>
            <span className="flex items-center gap-1 font-bold text-[#8C6214]">
              <ShieldCheck size={12} className="text-[#8C6214]" /> 100% Genuine
            </span>
          </div>
        </div>

        {/* Action pills row: Instagram, WhatsApp, Call, Maps */}
        <div className="relative z-10 mt-3 grid grid-cols-4 gap-1.5 sm:gap-2">
          {actions.map(({ label, href, Icon, color }) => (
            <a
              key={label}
              href={href}
              target={label === 'Call' ? undefined : '_blank'}
              rel={label === 'Call' ? undefined : 'noreferrer noopener'}
              className="group flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 rounded-xl border border-[#D4AF37]/35 bg-[#FFFFFF] py-2 sm:py-2.5 px-1 text-[11px] sm:text-xs font-bold text-[#1C1D24] transition-all active:scale-95 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#121316] shadow-sm hover:shadow"
            >
              <Icon size={14} className={`${color} group-hover:text-[#121316] transition-colors`} />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
