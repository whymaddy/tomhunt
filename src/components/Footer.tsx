import { motion } from 'framer-motion';
import { MapPin, Phone, Instagram, MessageCircle, Navigation, ShieldCheck } from 'lucide-react';
import { SHOP } from '../lib/data';
import Logo from './Logo';
import BeamWordmarkFooter from './BeamWordmarkFooter';

export default function Footer() {
  const socials = [
    { label: 'Instagram', href: SHOP.instagram, icon: 'instagram' as const },
    { label: 'WhatsApp', href: SHOP.whatsapp, icon: 'whatsapp' as const },
    { label: 'Call', href: `tel:${SHOP.phoneTel}`, icon: 'phone' as const },
  ];

  const columns = [
    {
      title: 'Store Visit',
      links: [
        { label: 'Pratap Nagar, Jaipur', href: SHOP.maps },
        { label: 'Open 10 AM - 9:30 PM', href: SHOP.maps },
        { label: 'Instant Screen Repair', href: '#services' },
      ],
    },
  ];

  return (
    <BeamWordmarkFooter
      brand="TOMHUNT"
      wordmark="TOMHUNT"
      company="Tomhunt Mobile Store"
      year={new Date().getFullYear()}
      background="#090A0E"
      ink="#FFFFFF"
      muted="#A0A0A0"
      accent="#D4AF37"
      wordTop="#F5D061"
      wordFoot="#8C6514"
      cut={-0.06}
      socials={socials}
      columns={columns}
      className="mt-12 rounded-t-[32px] border-t-2 border-[#D4AF37]/40 shadow-2xl"
    >
      <div className="relative z-10 px-3.5 sm:px-4 pt-6">
        {/* Owner Profile Card in Light Luxury Aesthetic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/45 bg-gradient-to-br from-[#FFFFFF] via-[#FAF9F6] to-[#F3EFE9] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.4)] text-[#121316]"
        >
          {/* Subtle gold accent aura */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#D4AF37]/15 blur-2xl" />

          <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Owner photo with golden ring */}
            <div className="relative shrink-0">
              <div
                className="rounded-2xl p-[3px] shadow-lg shadow-black/20"
                style={{
                  background:
                    'linear-gradient(135deg, #ECC869 0%, #D4AF37 50%, #FFFFFF 80%, #996515 100%)',
                }}
              >
                <img
                  src="/images/owner.jpg"
                  alt="Townhunt Store Owner at Pratap Nagar Jaipur"
                  className="h-20 w-20 rounded-[13px] object-cover"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#D4AF37] text-[#121316] shadow-md">
                <ShieldCheck size={14} strokeWidth={2.6} />
              </span>
            </div>

            {/* Owner details & Pratap Nagar, Jaipur info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/45 bg-[#D4AF37]/15 px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-wider text-[#7A520E] uppercase shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8C6214] animate-pulse" />
                Store Owner &amp; Founder
              </div>

              <h3 className="mt-1.5 font-display text-lg font-black text-[#121316] flex items-center justify-center sm:justify-start gap-2">
                <span>{SHOP.owner}</span>
                <span className="text-[#8C6214] text-xs font-mono font-bold">
                  (Verified)
                </span>
              </h3>

              <p className="mt-1 flex items-center justify-center sm:justify-start gap-1 font-mono text-[11.5px] text-[#2D2E36]">
                <MapPin size={13} className="text-[#8C6214]" />
                <span className="font-bold text-[#121316]">Pratap Nagar, Jaipur</span>
                <span className="text-[#555]">· Rajasthan</span>
              </p>

              <p className="mt-1 text-[11px] leading-snug text-[#555660]">
                Visit our showroom for live device demos, best exchange rates, and instant warranty support.
              </p>
            </div>
          </div>

          {/* Contact buttons row */}
          <div className="mt-4 grid grid-cols-4 gap-2 pt-3 border-t border-[#D4AF37]/20">
            <a
              href={`tel:${SHOP.phoneTel}`}
              className="flex flex-col items-center justify-center gap-1 rounded-xl border border-[#D4AF37]/35 bg-[#FFFFFF] py-2.5 text-[10px] font-bold text-[#121316] transition hover:bg-[#D4AF37] hover:border-[#D4AF37] active:scale-95 shadow-sm"
            >
              <Phone size={14} className="text-[#8C6214]" /> Call
            </a>
            <a
              href={SHOP.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="flex flex-col items-center justify-center gap-1 rounded-xl border border-[#D4AF37]/35 bg-[#FFFFFF] py-2.5 text-[10px] font-bold text-[#121316] transition hover:bg-[#D4AF37] hover:border-[#D4AF37] active:scale-95 shadow-sm"
            >
              <MessageCircle size={14} className="text-[#1FB555]" /> WhatsApp
            </a>
            <a
              href={SHOP.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="flex flex-col items-center justify-center gap-1 rounded-xl border border-[#D4AF37]/35 bg-[#FFFFFF] py-2.5 text-[10px] font-bold text-[#121316] transition hover:bg-[#D4AF37] hover:border-[#D4AF37] active:scale-95 shadow-sm"
            >
              <Instagram size={14} className="text-[#E1306C]" /> Insta
            </a>
            <a
              href={SHOP.maps}
              target="_blank"
              rel="noreferrer noopener"
              className="flex flex-col items-center justify-center gap-1 rounded-xl border border-[#D4AF37]/35 bg-[#FFFFFF] py-2.5 text-[10px] font-bold text-[#121316] transition hover:bg-[#D4AF37] hover:border-[#D4AF37] active:scale-95 shadow-sm"
            >
              <Navigation size={14} className="text-[#3E74DD]" /> Maps
            </a>
          </div>
        </motion.div>

        {/* Brand Emblem & Tagline above wordmark */}
        <div className="mt-8 flex flex-col items-center text-center">
          <Logo size={48} withGlow={true} />
          <p className="mt-2.5 font-mono text-[10px] tracking-[0.35em] text-[#D4AF37] uppercase font-bold">
            Tomhunt Luxury Experience
          </p>
        </div>
      </div>
    </BeamWordmarkFooter>
  );
}
