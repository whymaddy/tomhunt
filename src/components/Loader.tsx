import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

export default function Loader({ show }: { show: boolean }) {
  const brandLetters = 'TOMHUNT'.split('');

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(12px)', scale: 1.02 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#121316]"
        >
          {/* Subtle background radial glow in logo gold */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full opacity-20 blur-3xl"
              style={{
                background: 'radial-gradient(circle, #D4AF37 0%, #ECC869 40%, transparent 70%)',
              }}
            />
          </div>

          {/* Rotating halo ring behind the logo */}
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
              className="absolute w-36 h-36 rounded-full border border-dashed border-[#D4AF37]/40 pointer-events-none"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
              className="absolute w-44 h-44 rounded-full border border-[#E0E0E0]/20 pointer-events-none"
            />

            {/* Logo from 2nd image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.65, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <Logo size={104} withGlow={true} />
            </motion.div>
          </div>

          {/* TOWNHUNT text with animation using the logo colors (Royal Gold & Chrome Silver) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-7 flex items-center justify-center space-x-1"
          >
            {brandLetters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)', scale: 0.8 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.35 + index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`font-display text-3xl sm:text-4xl font-extrabold tracking-wider ${
                  index % 2 === 0
                    ? 'gold-silver-gradient'
                    : 'text-[#D4AF37] drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]'
                }`}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.32em] text-[#E0E0E0]/80"
          >
            Mobile Showroom · Pratap Nagar, Jaipur
          </motion.p>

          {/* Progress bar in gold and silver */}
          <div className="relative mt-7 h-[2px] w-48 overflow-hidden rounded-full bg-[#616161]/40">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="h-full w-full rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-[#FFFFFF]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-3 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-[#E0E0E0]/50"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
            Loading Experience...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
