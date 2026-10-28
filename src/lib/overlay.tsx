import { createContext, useContext, useEffect } from 'react';

type OverlayApi = { inc: () => void; dec: () => void };

export const OverlayCtx = createContext<OverlayApi>({ inc: () => {}, dec: () => {} });

/** Registers an active overlay so the page behind it blurs + locks scroll. */
export function useOverlayLock(active: boolean) {
  const { inc, dec } = useContext(OverlayCtx);
  useEffect(() => {
    if (!active) return;
    inc();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dec();
      document.body.style.overflow = prev;
    };
  }, [active, inc, dec]);
}
