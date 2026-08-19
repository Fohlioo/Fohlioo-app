"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthFormCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerPrompt: string;
  footerLinkLabel: string;
  footerHref: string;
};

export function AuthFormCard({
  title,
  subtitle,
  children,
  footerPrompt,
  footerLinkLabel,
  footerHref,
}: AuthFormCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.28,
        delay: reduceMotion ? 0 : 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full"
    >
      <header className="mb-8">
        <h2 className="font-hilmar text-2xl tracking-tight text-neutral-900">
          {title}
        </h2>
        <p className="mt-2 text-sm text-neutral-900/55">{subtitle}</p>
      </header>

      {children}

      <p className="mt-8 text-center text-sm text-neutral-900/55">
        {footerPrompt}{" "}
        <Link
          href={footerHref}
          className="font-medium text-brand-600 transition-colors hover:text-brand-600/80"
        >
          {footerLinkLabel}
        </Link>
      </p>
    </motion.div>
  );
}
