import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Sparkles } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../lib/data';

export default function Catalog() {
  const [active, setActive] = useState<string>('All');

  const items = useMemo(
    () => (active === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === active)),
    [active],
  );

  return (
    <section id="shop" className="mt-10 scroll-mt-24 px-3.5 sm:px-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/45 bg-[#FFFFFF]/95 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-[#7A520E] shadow-sm">
            <Sparkles size={10} className="text-[#8C6214]" /> Exclusive Collection
          </span>
          <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-white drop-shadow-sm">
            Our Catalog
          </h2>
        </div>
        <span className="font-mono text-[10px] text-[#F5D061] font-semibold">
          {items.length} items
        </span>
      </div>

      <p className="mt-1 text-[11.5px] text-[#D1D1D6]">
        View-only showroom showcase · visit in Pratap Nagar, Jaipur to test any model.
      </p>

      {/* Categories Filter */}
      <div className="no-scrollbar -mx-3.5 sm:-mx-4 mt-4 flex gap-1.5 overflow-x-auto px-3.5 sm:px-4 pb-1">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[11.5px] font-semibold transition active:scale-95 shadow-sm ${
              active === c
                ? 'border-[#D4AF37] bg-[#D4AF37] text-[#121316] font-bold shadow-[#D4AF37]/25'
                : 'border-[#D4AF37]/35 bg-[#FFFFFF]/90 text-[#33333A] hover:border-[#D4AF37] hover:bg-white'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Products Grid with Light Luxury Cards */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        <AnimatePresence mode="popLayout">
          {items.map((p, i) => (
            <motion.article
              key={p.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3, delay: (i % 6) * 0.04 }}
              className="overflow-hidden rounded-2xl border border-[#D4AF37]/35 bg-[#FFFFFF] shadow-md hover:border-[#D4AF37] hover:shadow-xl transition-all"
            >
              <div className="relative aspect-square overflow-hidden bg-[#F7F5F0]">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <span className="absolute top-2 left-2 rounded-full bg-[#FFFFFF]/95 px-2 py-0.5 font-mono text-[8.5px] font-bold uppercase tracking-wider text-[#7A520E] backdrop-blur border border-[#D4AF37]/40 shadow-sm">
                  {p.cat}
                </span>
              </div>
              <div className="p-3">
                <h3 className="line-clamp-1 text-[13px] font-bold text-[#141518]">
                  {p.name}
                </h3>
                <p className="mt-1 font-mono text-[13.5px] font-extrabold text-[#8C6214]">
                  {p.price}
                </p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#FFFFFF]/90 py-2 font-mono text-[9.5px] uppercase tracking-wider text-[#444] shadow-sm">
        <Eye size={11} className="text-[#8C6214]" /> In-store showcase · hands-on trial available
      </div>
    </section>
  );
}
