"use client";

import { AuthAntdProvider } from "@/components/auth/AuthAntdProvider";
import { AuthShell } from "@/components/auth/AuthShell";
import type { ReactNode } from "react";
import "antd/dist/reset.css";


export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthAntdProvider>
      <AuthShell>{children}</AuthShell>
    </AuthAntdProvider>
  );
}
