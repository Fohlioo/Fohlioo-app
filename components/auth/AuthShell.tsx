"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { AuthFeedMockup } from "@/components/auth/AuthFeedMockup";
import logo from "@/assets/images/logo.svg";

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex min-h-full flex-1 bg-neutral-50">
      {/* Brand atmosphere — desktop */}
      <aside className="relative hidden w-[46%] overflow-hidden lg:flex lg:flex-col lg:px-12 lg:py-12 xl:px-16 xl:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 30%, var(--brand-100) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 80% 80%, rgba(83, 74, 183, 0.08) 0%, transparent 50%), linear-gradient(165deg, var(--neutral-100) 0%, var(--neutral-50) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(26, 25, 23, 0.06) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        <motion.div
          className="relative z-10 shrink-0"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.28,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Image src={logo} alt="Fohlioo" width={100} height={32} priority />
        </motion.div>

        <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center py-8">
          <AuthFeedMockup />
        </div>

        <motion.div
          className="relative z-10 max-w-sm shrink-0"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: reduceMotion ? 0 : 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <h1 className="font-hilmar text-[1.75rem] leading-tight tracking-tight text-neutral-900 xl:text-[2rem]">
            Better choices.
            <br />
            Smarter collections.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-neutral-900/60">
            Fashion intelligence built from how you actually shop — across every
            brand.
          </p>
        </motion.div>
      </aside>

      {/* Form column */}
      <main className="relative flex flex-1 flex-col px-6 py-10 sm:px-10 lg:px-16 lg:py-16">
        {/* Mobile brand mark */}
        <div className="mb-10 lg:hidden">
          <Image src={logo} alt="Fohlioo" width={90} height={28} priority />
        </div>

        <div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center">
          {children}
        </div>
      </main>
    </div>
  );
}
