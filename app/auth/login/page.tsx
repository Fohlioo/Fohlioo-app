import { AuthFormCard } from "@/components/auth/AuthFormCard";
import { LoginForm } from "@/components/auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in · Fohlioo",
  description: "Sign in to your Fohlioo account.",
};

export default function LoginPage() {
  return (
    <AuthFormCard
      title="Welcome back"
      subtitle="Sign in to continue to your style intelligence."
      footerPrompt="Don't have an account?"
      footerLinkLabel="Create one"
      footerHref="/auth/register"
    >
      <LoginForm />
    </AuthFormCard>
  );
}
