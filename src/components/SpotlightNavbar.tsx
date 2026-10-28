import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { cn } from "../lib/utils";

export interface NavItem {
  label: string;
  href: string;
}

export interface SpotlightNavbarProps {
  items?: NavItem[];
  className?: string;
  onItemClick?: (item: NavItem, index: number) => void;
  defaultActiveIndex?: number;
  activeIndex?: number;
}

export function SpotlightNavbar({
  items = [
    { label: "Home", href: "#home" },
    { label: "New", href: "#launches" },
    { label: "Shop", href: "#shop" },
    { label: "Services", href: "#services" },
  ],
  className,
  onItemClick,
  defaultActiveIndex = 0,
  activeIndex: controlledIndex,
}: SpotlightNavbarProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const [internalIndex, setInternalIndex] = useState(defaultActiveIndex);
  const activeIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;
  const [hoverX, setHoverX] = useState<number | null>(null);

  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setHoverX(x);
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };

    const handleMouseLeave = () => {
      setHoverX(null);
      const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const targetX = itemRect.left - navRect.left + itemRect.width / 2;

        animate(spotlightX.current, targetX, {
          type: "spring",
          stiffness: 200,
          damping: 20,
          onUpdate: (v) => {
            spotlightX.current = v;
            nav.style.setProperty("--spotlight-x", `${v}px`);
          },
        });
      }
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeIndex]);

  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;
    const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);

    if (activeItem) {
      const navRect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetX = itemRect.left - navRect.left + itemRect.width / 2;

      animate(ambienceX.current, targetX, {
        type: "spring",
        stiffness: 200,
        damping: 20,
        onUpdate: (v) => {
          ambienceX.current = v;
          nav.style.setProperty("--ambience-x", `${v}px`);
        },
      });
    }
  }, [activeIndex]);

  const handleItemClick = (item: NavItem, index: number) => {
    setInternalIndex(index);
    onItemClick?.(item, index);
  };

  return (
    <div className={cn("relative flex justify-center items-center", className)}>
      <nav
        ref={navRef}
        className={cn(
          "relative h-8 sm:h-9 rounded-full transition-all duration-300 overflow-hidden",
          "bg-[#FFFFFF]/95 border border-[#D4AF37]/40 shadow-sm shadow-[#D4AF37]/10"
        )}
        style={
          {
            "--spotlight-color": "rgba(212, 175, 55, 0.28)",
            "--ambience-color": "rgba(184, 134, 11, 0.95)",
          } as React.CSSProperties
        }
      >
        {/* Content */}
        <ul className="relative flex items-center h-full px-1 sm:px-1.5 gap-0 z-[10]">
          {items.map((item, idx) => (
            <li key={idx} className="relative h-full flex items-center justify-center">
              <a
                href={item.href}
                data-index={idx}
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item, idx);
                }}
                className={cn(
                  "px-2.5 sm:px-3.5 py-1 text-[11px] sm:text-xs font-semibold transition-colors duration-200 rounded-full select-none whitespace-nowrap",
                  "focus-visible:outline-none",
                  activeIndex === idx
                    ? "text-[#8C6214] font-bold drop-shadow-[0_1px_1px_rgba(212,175,55,0.3)]"
                    : "text-[#555660] hover:text-[#121316]"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* 1. Moving Spotlight (Follows Mouse) */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] opacity-0 transition-opacity duration-300"
          style={{
            opacity: hoverX !== null ? 1 : 0,
            background: `radial-gradient(90px circle at var(--spotlight-x) 100%, var(--spotlight-color, rgba(212,175,55,0.28)) 0%, transparent 60%)`,
          }}
        />

        {/* 2. Active State Ambience (Stays on Active) */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-[2.5px] z-[2]"
          style={{
            background: `radial-gradient(50px circle at var(--ambience-x) 0%, var(--ambience-color, rgba(184,134,11,0.95)) 0%, transparent 100%)`,
          }}
        />
      </nav>
    </div>
  );
}

export default SpotlightNavbar;
