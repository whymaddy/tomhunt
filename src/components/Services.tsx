import { motion } from 'framer-motion';
import { Wrench, ShieldCheck, Gift, Smartphone, ArrowRight } from 'lucide-react';
import { SHOP } from '../lib/data';

const SERVICES = [
  {
    Icon: ShieldCheck,
    title: 'With Warranty',
    desc: 'Written warranty & 100% genuine spares on every buy.',
  },
  {
    Icon: Smartphone,
    title: 'Free Glass with Mobile',
    desc: 'Premium 9H tempered glass fitted free on purchase.',
  },
  {
    Icon: Gift,
    title: 'Gift with Every Buy',
    desc: 'Assured gifts, cases & accessories on every device.',
  },
  {
    Icon: Wrench,
    title: 'Express Mobile Repair',
    desc: 'Screen, battery & port fixes completed in 45 min.',
  },
];

export default function Services() {
  return (
    <section id="services" className="mt-10 scroll-mt-24 px-3.5 sm:px-4">
      <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#F5D061]">
        Expert Support
      </span>
      <h2 className="mt-0.5 font-display text-2xl font-extrabold tracking-tight text-white drop-shadow-sm">
        Repair &amp; Services
      </h2>

      {/* Service Counter Card */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="relative mt-3.5 overflow-hidden rounded-2xl border border-[#D4AF37]/40 shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
      >
        <img
          src="/images/repair.jpg"
          alt="Mobile repairing at Tomhunt Jaipur"
          className="h-40 sm:h-48 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141518] via-[#141518]/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <span className="inline-block rounded-full bg-[#D4AF37] px-2 py-0.5 font-mono text-[8.5px] font-bold text-[#121316] uppercase tracking-wider mb-1 shadow-sm">
            Express Service
          </span>
          <h3 className="font-display text-[16px] sm:text-[18px] font-bold text-white">
            In-House Certified Service Counter
          </h3>
          <p className="mt-1 text-[11px] sm:text-[12px] leading-snug text-[#E0E0E6]">
            Expert technicians, genuine spares, and transparent repair pricing — at {SHOP.addressLine1}, Pratap Nagar, Jaipur.
          </p>
        </div>
      </motion.div>

      {/* Services Grid: 2 per row with Light Luxury Cards */}
      <div className="mt-3.5 grid grid-cols-2 gap-2.5 sm:gap-3">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex flex-col justify-between rounded-2xl border border-[#D4AF37]/35 bg-[#FFFFFF] p-3 sm:p-3.5 shadow-md hover:border-[#D4AF37] hover:shadow-lg transition-colors text-[#121316]"
          >
            <div>
              <span className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-xl bg-[#F6F4EE] text-[#8C6214] border border-[#D4AF37]/40 shadow-sm">
                <s.Icon size={16} />
              </span>
              <h4 className="mt-2.5 text-xs sm:text-[13px] font-bold text-[#121316] leading-snug">
                {s.title}
              </h4>
            </div>
            <p className="mt-1 text-[10.5px] sm:text-[11px] leading-snug text-[#555660]">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <a
        href={SHOP.whatsapp}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-3.5 flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] py-3 text-[12.5px] font-bold text-[#121316] shadow-lg shadow-[#D4AF37]/25 transition active:scale-95 hover:bg-[#F5D061]"
      >
        Ask for instant repair quote <ArrowRight size={14} />
      </a>
    </section>
  );
}
