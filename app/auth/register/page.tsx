import { AuthFormCard } from "@/components/auth/AuthFormCard";
import { RegisterForm } from "@/components/auth/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create account · Fohlioo",
  description: "Create your Fohlioo shopper account.",
};

export default function RegisterPage() {
  return (
    <AuthFormCard
      title="Create your account"
      subtitle="Start building your style intelligence from how you shop."
      footerPrompt="Already have an account?"
      footerLinkLabel="Sign in"
      footerHref="/auth/login"
    >
      <RegisterForm />
    </AuthFormCard>
  );
}
