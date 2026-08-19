"use client";

import { ConfigProvider } from "antd";
import type { ReactNode } from "react";

const fohliooTheme = {
  token: {
    colorPrimary: "#000",
    colorError: "#D85A30",
    colorSuccess: "#0F6E56",
    colorWarning: "#BA7517",
    colorInfo: "#185FA5",
    colorText: "#1A1917",
    colorTextSecondary: "rgba(26, 25, 23, 0.65)",
    colorBorder: "#E8E5DF",
    colorBgContainer: "#FAFAF8",
    borderRadius: 8,
    fontFamily:
      "var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif",
    controlHeight: 44,
  },
  components: {
    Button: {
      fontWeight: 500,
      primaryShadow: "none",
      defaultShadow: "none",
    },
    Input: {
      activeBorderColor: "#534AB7",
      hoverBorderColor: "#534AB7",
      activeShadow: "0 0 0 2px #EEEDFE",
    },
    Checkbox: {
      colorPrimary: "#534AB7",
    },
  },
};

export function AuthAntdProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={fohliooTheme}>{children}</ConfigProvider>;
}
