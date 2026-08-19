"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import feedMockup from "@/assets/images/shopper-feed-mockup.png";

/**
 * Auth brand-panel preview using the designed shopper feed screenshot.
 */
export function AuthFeedMockup() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="relative z-10 w-full max-w-[520px] select-none [perspective:1400px]"
      initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.35,
        delay: reduceMotion ? 0 : 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="overflow-hidden rounded-[12px] border border-neutral-200 bg-neutral-50 shadow-[0_28px_56px_-16px_rgba(26,25,23,0.22),0_10px_20px_-10px_rgba(26,25,23,0.1)] [transform:rotateY(3deg)_rotateX(1.5deg)]">
        <Image
          src={feedMockup}
          alt=""
          className="h-auto w-full"
          sizes="(min-width: 1024px) 46vw, 0px"
          priority
        />
      </div>

      <div
        className="pointer-events-none absolute -bottom-6 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-[100%] bg-brand-600/10 blur-2xl"
        aria-hidden
      />
    </motion.div>
  );
}
