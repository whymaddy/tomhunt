import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useOverlayLock } from '../lib/overlay';

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label?: string;
};

export default function Modal({ open, onClose, children, label }: Props) {
  useOverlayLock(open);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={label ?? 'Dialog'}
          className="fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-xs px-4 py-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[400px]"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-3 -right-1 z-10 grid h-9 w-9 place-items-center rounded-full border border-[#D4AF37]/50 bg-[#212121] text-[#F5D061] shadow-lg shadow-black/50 transition active:scale-90"
            >
              <X size={17} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
