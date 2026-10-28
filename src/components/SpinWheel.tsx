import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, AlertTriangle, PartyPopper, Ticket } from 'lucide-react';
import Modal from './Modal';
import { PRIZES, SHOP } from '../lib/data';

const STORAGE_KEY = 'tomhunt_spin_v2';
const SEG = 360 / PRIZES.length;
const CX = 150;
const CY = 150;
const R = 142;

type Record = { name: string; phone: string; prize: string; date: string; code: string };

function arcPath(index: number) {
  const a0 = (-90 + index * SEG) * (Math.PI / 180);
  const a1 = (-90 + (index + 1) * SEG) * (Math.PI / 180);
  const x0 = CX + R * Math.cos(a0);
  const y0 = CY + R * Math.sin(a0);
  const x1 = CX + R * Math.cos(a1);
  const y1 = CY + R * Math.sin(a1);
  return `M ${CX} ${CY} L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${R} ${R} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
}

function readRecord(): Record | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record) : null;
  } catch {
    return null;
  }
}

export default function SpinWheel() {
  const [formOpen, setFormOpen] = useState(false);
  const [winOpen, setWinOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [record, setRecord] = useState<Record | null>(() => readRecord());
  const wheelRef = useRef<HTMLDivElement>(null);

  const openForm = () => {
    setError('');
    const existing = readRecord();
    if (existing) {
      setRecord(existing);
      setName(existing.name);
      setPhone(existing.phone);
    }
    setFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.replace(/\D/g, '');

    if (cleanName.length < 2) {
      setError('Please enter your full name');
      return;
    }
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    // Pick prize
    const eligibleIndices = PRIZES.map((_, i) => i);
    const index = eligibleIndices[Math.floor(Math.random() * eligibleIndices.length)];
    const prize = PRIZES[index];
    const center = index * SEG + SEG / 2;
    const target = rotation + 360 * 6 + (360 - (((rotation % 360) + center) % 360));

    setFormOpen(false);
    setError('');
    setSpinning(true);
    setRotation(target);
    wheelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    window.setTimeout(() => {
      const entry: Record = {
        name: cleanName,
        phone: cleanPhone,
        prize,
        date: new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        code: `TH-${cleanPhone.slice(-4)}-${Date.now().toString().slice(-5)}`,
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
      } catch {
        /* storage blocked */
      }
      setRecord(entry);
      setSpinning(false);
      setWinOpen(true);
    }, 5200);
  };

  return (
    <section className="mt-10 px-3.5 sm:px-4">
      <div className="relative overflow-hidden rounded-[28px] border border-[#D4AF37]/40 bg-gradient-to-b from-[#FFFFFF] via-[#FAF9F6] to-[#F3EFE9] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.35)] text-[#121316]">
        {/* Subtle gold aura */}
        <div className="pointer-events-none absolute -top-20 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-[#D4AF37]/15 blur-3xl" />

        <div className="relative text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/45 bg-[#D4AF37]/15 px-3 py-1 font-mono text-[9px] font-bold tracking-widest text-[#7A520E] uppercase shadow-sm">
            <Gift size={11} className="text-[#8C6214]" /> Showroom Lucky Wheel
          </span>
          <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-[#121316]">
            Spin &amp; Win
          </h2>
          <p className="mx-auto mt-1 max-w-[280px] text-[12px] leading-snug text-[#555660]">
            One free spin per visitor. Screenshot your coupon and redeem it at our counter in Pratap Nagar, Jaipur.
          </p>
        </div>

        {/* Wheel */}
        <div ref={wheelRef} className="relative mx-auto mt-6 w-[280px] max-w-full">
          {/* Pointer */}
          <div className="absolute -top-1 left-1/2 z-20 -translate-x-1/2">
            <div className="h-0 w-0 border-t-[20px] border-r-[11px] border-l-[11px] border-t-[#D4AF37] border-r-transparent border-l-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
          </div>

          <div className="rounded-full border-[6px] border-[#FFFFFF] bg-[#FAF8F5] p-1 shadow-2xl">
            <motion.div
              animate={{ rotate: rotation }}
              transition={{ duration: 5, ease: [0.12, 0.72, 0.1, 1] }}
              style={{ willChange: 'transform' }}
            >
              <svg viewBox="0 0 300 300" className="block h-auto w-full">
                {PRIZES.map((prize, i) => {
                  const even = i % 2 === 0;
                  const words = prize.split(' ');
                  return (
                    <g key={prize}>
                      <path
                        d={arcPath(i)}
                        fill={even ? '#1A1B22' : '#2D2E38'}
                        stroke="#D4AF37"
                        strokeWidth="1.2"
                      />
                      <g transform={`rotate(${i * SEG + SEG / 2} ${CX} ${CY})`}>
                        <text
                          x={CX}
                          y={words.length > 1 ? CY - 92 : CY - 86}
                          textAnchor="middle"
                          fontFamily="'Outfit', sans-serif"
                          fontSize="13"
                          fontWeight="700"
                          fill={even ? '#F5D061' : '#FFFFFF'}
                        >
                          {words.map((w, wi) => (
                            <tspan key={w + wi} x={CX} dy={wi === 0 ? 0 : 16}>
                              {w}
                            </tspan>
                          ))}
                        </text>
                      </g>
                    </g>
                  );
                })}
                <circle cx={CX} cy={CY} r={R} fill="none" stroke="#D4AF37" strokeWidth="2.5" opacity="0.6" />
              </svg>
            </motion.div>
          </div>

          {/* Central Hub with Gold crown & TH */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 grid h-[64px] w-[64px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-[#D4AF37] bg-[#FFFFFF] shadow-xl">
            <div className="text-center">
              <span className="block font-display text-[12px] leading-none font-black tracking-wider text-[#8C6214]">
                TH
              </span>
              <span className="block font-mono text-[7px] leading-none font-bold text-[#555] mt-0.5">
                LUCKY
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={openForm}
          disabled={spinning}
          className="relative mx-auto mt-6 block w-full max-w-[260px] rounded-full bg-[#D4AF37] py-3.5 font-display text-[14px] font-extrabold tracking-wider text-[#121316] uppercase shadow-lg shadow-[#D4AF37]/25 transition active:scale-95 disabled:opacity-60 hover:bg-[#F5D061]"
        >
          {spinning ? 'Spinning…' : record ? 'View My Prize' : 'Spin the Wheel'}
        </button>

        {record && !spinning && (
          <button
            onClick={() => setWinOpen(true)}
            className="mx-auto mt-2.5 block font-mono text-[10px] tracking-wider text-[#8C6214] font-bold underline underline-offset-4"
          >
            Saved Coupon: {record.code}
          </button>
        )}
      </div>

      {/* Entry form modal */}
      <Modal open={formOpen} onClose={() => setFormOpen(false)} label="Spin entry form">
        <div className="rounded-3xl border border-[#D4AF37]/45 bg-[#FAF9F6] text-[#121316] p-6 shadow-2xl">
          <h3 className="font-display text-xl font-extrabold text-[#121316]">
            Before you spin
          </h3>
          <p className="mt-1 text-[12px] text-[#555660]">
            Enter your details to claim this prize at our Pratap Nagar, Jaipur showroom.
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <label className="block">
              <span className="font-mono text-[9.5px] font-bold tracking-[0.2em] text-[#8C6214] uppercase">
                Name
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="mt-1 w-full rounded-xl border border-[#D4AF37]/35 bg-white px-4 py-2.5 text-[14px] text-[#121316] outline-none placeholder:text-[#999] focus:border-[#D4AF37]"
              />
            </label>

            <label className="block">
              <span className="font-mono text-[9.5px] font-bold tracking-[0.2em] text-[#8C6214] uppercase">
                Mobile Number
              </span>
              <input
                value={phone}
                inputMode="numeric"
                maxLength={10}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="10-digit mobile number"
                className="mt-1 w-full rounded-xl border border-[#D4AF37]/35 bg-white px-4 py-2.5 font-mono text-[14px] text-[#121316] outline-none placeholder:text-[#999] focus:border-[#D4AF37]"
              />
            </label>

            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-400 bg-red-50 p-2.5 text-[11.5px] leading-snug text-red-700">
                <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-[#D4AF37] py-3 font-display text-[14px] font-extrabold tracking-wide text-[#121316] uppercase transition active:scale-95 shadow-md hover:bg-[#F5D061]"
            >
              Submit &amp; Spin
            </button>
            <p className="text-center font-mono text-[9px] tracking-wider text-[#777] uppercase">
              One spin per device · Valid at Pratap Nagar, Jaipur
            </p>
          </form>
        </div>
      </Modal>

      {/* Winner modal */}
      <Modal open={winOpen} onClose={() => setWinOpen(false)} label="Prize won">
        {record && (
          <div className="overflow-hidden rounded-3xl border border-[#D4AF37]/50 bg-[#FAF9F6] text-[#121316] shadow-2xl">
            <div className="bg-[#FFFFFF] px-5 py-4 text-center border-b border-[#D4AF37]/30">
              <PartyPopper size={24} className="mx-auto text-[#8C6214]" />
              <p className="mt-1 font-display text-[18px] font-extrabold text-[#121316]">
                Congratulations!
              </p>
            </div>

            <div className="px-5 pt-4 pb-6 text-center">
              <p className="font-mono text-[9.5px] font-bold tracking-[0.25em] text-[#8C6214] uppercase">
                You won
              </p>
              <p className="mt-1 font-display text-[30px] leading-none font-black text-[#8C6214]">
                {record.prize}
              </p>

              <div className="mt-4 space-y-2 rounded-2xl border border-[#D4AF37]/30 bg-white p-3.5 text-left shadow-sm">
                <Row label="Name" value={record.name} />
                <Row label="Mobile" value={`+91 ${record.phone}`} mono />
                <Row label="Coupon" value={record.code} mono />
                <Row label="Date" value={record.date} />
                <Row label="Store" value="Tomhunt · Pratap Nagar, Jaipur" />
              </div>

              <div className="mt-3.5 flex items-center justify-center gap-1.5 font-mono text-[9.5px] font-semibold tracking-wider text-[#555] uppercase">
                <Ticket size={12} className="text-[#8C6214]" /> Screenshot this &amp; show at counter
              </div>

              <a
                href={`tel:${SHOP.phoneTel}`}
                className="mt-3.5 flex w-full items-center justify-center rounded-full bg-[#D4AF37] py-3 text-[13px] font-bold text-[#121316] transition active:scale-95 shadow-md hover:bg-[#F5D061]"
              >
                Call store to reserve offer
              </a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-mono text-[9.5px] font-bold tracking-[0.18em] text-[#8C6214] uppercase">
        {label}
      </span>
      <span
        className={`text-right text-[12.5px] font-semibold text-[#121316] ${mono ? 'font-mono' : ''}`}
      >
        {value}
      </span>
    </div>
  );
}
