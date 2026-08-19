"use client";

import { useEffect } from "react";
import { getSupabaseBrowserClient } from '@/lib/browser-client'
import { SocialAuthButton } from "@/components/auth/SocialAuthButton";
import { Button, Input } from "antd";
import { Formik, Form as FormikForm, Field, type FieldProps } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/context/AuthContext";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

type LoginValues = Yup.InferType<typeof loginSchema>;

const initialValues: LoginValues = {
  email: "",
  password: "",
};

export function LoginForm() {


  const { signInWithEmail, handleSetCurrentUser } = useAuth()

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        handleSetCurrentUser(session?.user ?? null)
      }
    )
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [handleSetCurrentUser])


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={async (values) => {
        await signInWithEmail(values)
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <FormikForm className="flex flex-col gap-5" noValidate>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium text-neutral-900/70"
            >
              Email
            </label>
            <Field name="email">
              {({ field }: FieldProps<string>) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  size="large"
                  autoComplete="email"
                  placeholder="you@example.com"
                  status={touched.email && errors.email ? "error" : undefined}
                  className="!bg-neutral-50"
                />
              )}
            </Field>
            {touched.email && errors.email ? (
              <p className="text-xs text-danger-600">{errors.email}</p>
            ) : null}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-medium text-neutral-900/70"
            >
              Password
            </label>
            <Field name="password">
              {({ field }: FieldProps<string>) => (
                <Input.Password
                  {...field}
                  id="password"
                  size="large"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  status={
                    touched.password && errors.password ? "error" : undefined
                  }
                  className="!bg-neutral-50"
                />
              )}
            </Field>
            {touched.password && errors.password ? (
              <p className="text-xs text-danger-600">{errors.password}</p>
            ) : null}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isSubmitting}
            className="!mt-1 !h-11 !font-medium"
          >
            Sign in
          </Button>

          <div className="relative my-1 flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-200" />
            <span className="text-[11px] uppercase tracking-[0.08em] text-neutral-900/40">
              or
            </span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          <SocialAuthButton />
        </FormikForm>
      )}
    </Formik>
  );
}
