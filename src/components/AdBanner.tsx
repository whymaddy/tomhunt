import { useState } from 'react';
import { motion } from 'framer-motion';
import { BadgePercent, Check } from 'lucide-react';
import Modal from './Modal';
import { SHOP, PROMO_BANNER } from '../lib/data';

const OFFERS = [
  'Flat 40% off on selected 5G smartphones',
  'Exchange bonus up to ₹8,000 on any brand',
  'No-cost EMI for 6 / 9 / 12 months with 0 down payment',
  'Free 9H tempered glass + premium case with every phone',
  '1 year extended showroom warranty at ₹999 only',
];

export default function AdBanner() {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-8 px-3.5 sm:px-4">
      <motion.button
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-2xl border border-[#D4AF37]/40 shadow-[0_12px_30px_rgba(0,0,0,0.5)] active:scale-[0.98]"
      >
        <img
          src={PROMO_BANNER.bannerImage}
          alt="Festive offer banner at Tomhunt"
          className="h-[120px] sm:h-[140px] w-full object-cover"
        />
        {/* Badge with only "Tap" in light gold style */}
        <span className="absolute right-3 bottom-3 rounded-full bg-[#FFFFFF]/95 px-3.5 py-1 font-mono text-[10px] font-bold tracking-wider text-[#7A520E] uppercase backdrop-blur border border-[#D4AF37]/45 shadow-md">
          Tap
        </span>
      </motion.button>

      <Modal open={open} onClose={() => setOpen(false)} label="Offer details">
        <div className="overflow-hidden rounded-3xl border border-[#D4AF37]/45 bg-[#FAF9F6] text-[#121316] shadow-2xl">
          <div className="relative">
            <img src={PROMO_BANNER.popupPoster} alt="Offer poster" className="h-32 w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] to-transparent" />
          </div>

          <div className="-mt-6 px-5 pb-6 bg-[#FAF9F6] relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] px-3 py-1 font-mono text-[9.5px] font-bold tracking-wider text-[#121316] uppercase shadow-sm">
              <BadgePercent size={11} /> Exclusive Store Offer
            </span>
            <h3 className="mt-3 font-display text-2xl leading-tight font-extrabold text-[#121316]">
              Up to 40% off, this festive season
            </h3>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#4F505A]">
              Our biggest sale at {SHOP.name}. Walk into our showroom at {SHOP.city}, compare live models hands-on, and walk out with the best guaranteed deal.
            </p>

            <ul className="mt-4 space-y-2">
              {OFFERS.map((o) => (
                <li key={o} className="flex items-start gap-2 text-[12.5px] font-medium text-[#222226]">
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#D4AF37] text-[#121316]">
                    <Check size={10} strokeWidth={3} />
                  </span>
                  {o}
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-2xl border border-[#D4AF37]/30 bg-white p-3 shadow-sm">
              <p className="font-mono text-[9.5px] tracking-[0.2em] text-[#8C6214] uppercase font-bold">
                Valid till
              </p>
              <p className="font-display text-[15px] font-bold text-[#121316]">
                End of this month · Limited Stock
              </p>
              <p className="mt-1 text-[11px] text-[#666670]">
                Show this screen at the counter in Pratap Nagar, Jaipur to claim. T&amp;C apply.
              </p>
            </div>

            <a
              href={`tel:${SHOP.phoneTel}`}
              className="mt-4 flex w-full items-center justify-center rounded-full bg-[#D4AF37] py-3 text-sm font-bold text-[#121316] transition active:scale-95 shadow-lg border border-[#F5D061]/50"
            >
              Call to reserve · {SHOP.phoneDisplay}
            </a>
          </div>
        </div>
      </Modal>
    </section>
  );
}
