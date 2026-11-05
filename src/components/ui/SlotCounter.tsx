"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SlotCounterProps {
  value: string | number;
  duration?: number; // duration in seconds
  className?: string;
  prefix?: string;
  suffix?: string;
  delay?: number; // delay in ms
}

/**
 * SlotCounter — mechanical slot machine / odometer reel rolling counter
 * Spins digits vertically through 0-9 and snaps into the target digit with easing.
 */
export function SlotCounter({
  value,
  duration = 1.8,
  className,
  prefix = "",
  suffix = "",
  delay = 0,
}: SlotCounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // String representation of target value
  const strVal = String(value);

  // Check when element comes into viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Characters to render
  const characters = strVal.split("");

  return (
    <span
      ref={containerRef}
      className={cn("inline-flex items-baseline font-black tracking-tight", className)}
      aria-label={`${prefix}${strVal}${suffix}`}
    >
      {prefix && <span className="mr-0.5 select-none">{prefix}</span>}

      {characters.map((char, idx) => {
        const isDigit = /[0-9]/.test(char);

        if (!isDigit) {
          // Render punctuation, commas, dashes, plus signs directly
          return (
            <span key={idx} className="inline-block select-none">
              {char}
            </span>
          );
        }

        const digit = parseInt(char, 10);
        // Stagger each digit's spin duration and delay slightly
        const digitDelay = delay + idx * 0.12;

        return (
          <DigitReel
            key={`${idx}-${char}`}
            targetDigit={digit}
            isAnimating={inView}
            duration={duration + idx * 0.15}
            delay={digitDelay}
          />
        );
      })}

      {suffix && <span className="ml-0.5 select-none">{suffix}</span>}
    </span>
  );
}

interface DigitReelProps {
  targetDigit: number;
  isAnimating: boolean;
  duration: number;
  delay: number;
}

function DigitReel({ targetDigit, isAnimating, duration, delay }: DigitReelProps) {
  // We create a reel strip of digits: 0 1 2 3 4 5 6 7 8 9 (repeated twice for realistic spin effect)
  // [0..9, 0..9, targetDigit]
  const strip = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    targetDigit
  ];

  // Final position index
  const finalIndex = strip.length - 1;

  // Each number takes 1em height
  const translateY = isAnimating ? -finalIndex * 100 : 0;

  return (
    <span
      className="inline-block relative overflow-hidden h-[1.15em] leading-[1.15em] align-top text-center"
      style={{ width: "0.62em" }}
    >
      <span
        className="block transition-transform will-change-transform"
        style={{
          transform: `translateY(${translateY / strip.length}%)`,
          transitionDuration: `${duration}s`,
          transitionDelay: `${delay}s`,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", // spring-like slot deceleration
        }}
      >
        {strip.map((d, i) => (
          <span key={i} className="block h-[1.15em] leading-[1.15em] text-center select-none">
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

