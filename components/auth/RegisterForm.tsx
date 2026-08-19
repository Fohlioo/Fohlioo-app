'use client'

import { useEffect } from 'react'

import { SocialAuthButton } from '@/components/auth/SocialAuthButton'
import { Button, Checkbox, Input } from 'antd'
import { Formik, Form as FormikForm, Field, type FieldProps } from 'formik'
import Link from 'next/link'
import * as Yup from 'yup'
import { useAuth } from '@/context/AuthContext'
import { getSupabaseBrowserClient } from '@/lib/browser-client'

import type { SignUpWithEmailParams } from '@/types'

const registerSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .min(1, 'First name is required')
    .required('First name is required'),
  lastName: Yup.string()
    .trim()
    .min(1, 'Last name is required')
    .required('Last name is required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  acceptedTerms: Yup.boolean()
    .oneOf([true], 'You must accept the Terms and Privacy Policy')
    .required()
})

const initialValues: SignUpWithEmailParams = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  acceptedTerms: false
}

export function RegisterForm () {
  const { signUpWithEmail, handleSetCurrentUser } = useAuth()

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
      validationSchema={registerSchema}
      onSubmit={async (values) => {
        await signUpWithEmail(values)
      }}
    >
      {({ isSubmitting, errors, touched, values, setFieldValue }) => (
        <FormikForm className='flex flex-col gap-5' noValidate>
          <div className='flex flex-col gap-1.5'>
            <label
              htmlFor='firstName'
              className='text-xs font-medium text-neutral-900/70'
            >
              First name
            </label>
            <Field name='firstName'>
              {({ field }: FieldProps<string>) => (
                <Input
                  {...field}
                  id='firstName'
                  size='large'
                  autoComplete='given-name'
                  placeholder='Alex'
                  status={
                    touched.firstName && errors.firstName ? 'error' : undefined
                  }
                  className='!bg-neutral-50'
                />
              )}
            </Field>
            {touched.firstName && errors.firstName ? (
              <p className='text-xs text-danger-600'>{errors.firstName}</p>
            ) : null}
          </div>

          <div className='flex flex-col gap-1.5'>
            <label
              htmlFor='lastName'
              className='text-xs font-medium text-neutral-900/70'
            >
              Last name
            </label>
            <Field name='lastName'>
              {({ field }: FieldProps<string>) => (
                <Input
                  {...field}
                  id='lastName'
                  size='large'
                  autoComplete='family-name'
                  placeholder='Doe'
                  className='focus:outline-none'
                />
              )}
            </Field>
            {touched.lastName && errors.lastName ? (
              <p className='text-xs text-danger-600'>{errors.lastName}</p>
            ) : null}
          </div>

          <div className='flex flex-col gap-1.5'>
            <label
              htmlFor='email'
              className='text-xs font-medium text-neutral-900/70'
            >
              Email
            </label>
            <Field name='email'>
              {({ field }: FieldProps<string>) => (
                <Input
                  {...field}
                  id='email'
                  type='email'
                  size='large'
                  autoComplete='email'
                  placeholder='you@example.com'
                  status={touched.email && errors.email ? 'error' : undefined}
                  className='!bg-neutral-50'
                />
              )}
            </Field>
            {touched.email && errors.email ? (
              <p className='text-xs text-danger-600'>{errors.email}</p>
            ) : null}
          </div>

          <div className='flex flex-col gap-1.5'>
            <label
              htmlFor='password'
              className='text-xs font-medium text-neutral-900/70'
            >
              Password
            </label>
            <Field name='password'>
              {({ field }: FieldProps<string>) => (
                <Input.Password
                  {...field}
                  id='password'
                  size='large'
                  autoComplete='new-password'
                  placeholder='At least 8 characters'
                  status={
                    touched.password && errors.password ? 'error' : undefined
                  }
                  className='!bg-neutral-50'
                />
              )}
            </Field>
            {touched.password && errors.password ? (
              <p className='text-xs text-danger-600'>{errors.password}</p>
            ) : null}
          </div>

          <div className='flex flex-col gap-3 pt-1'>
            <div className='flex flex-col gap-1'>
              <Checkbox
                checked={values.acceptedTerms}
                onChange={e => setFieldValue('acceptedTerms', e.target.checked)}
                className='!items-start [&_.ant-checkbox]:mt-0.5'
              >
                <span className='text-sm leading-snug text-neutral-900/70'>
                  I agree to the{' '}
                  <Link
                    href='/terms'
                    className='font-medium text-brand-600 hover:text-brand-600/80'
                    onClick={e => e.stopPropagation()}
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href='/privacy'
                    className='font-medium text-brand-600 hover:text-brand-600/80'
                    onClick={e => e.stopPropagation()}
                  >
                    Privacy Policy
                  </Link>
                </span>
              </Checkbox>
              {touched.acceptedTerms && errors.acceptedTerms ? (
                <p className='pl-6 text-xs text-danger-600'>
                  {errors.acceptedTerms}
                </p>
              ) : null}
            </div>

            {/*   <Checkbox
              checked={values.marketingOptIn}
              onChange={(e) =>
                setFieldValue("marketingOptIn", e.target.checked)
              }
              className="!items-start [&_.ant-checkbox]:mt-0.5"
            >
              <span className="text-sm leading-snug text-neutral-900/70">
                Send me product updates and fashion insights (optional)
              </span>
            </Checkbox> */}
          </div>

          <Button
            type='primary'
            htmlType='submit'
            size='large'
            block
            loading={isSubmitting}
            className='!mt-1 !h-11 !font-medium'
          >
            Create account
          </Button>

          <div className='relative my-1 flex items-center gap-3'>
            <div className='h-px flex-1 bg-neutral-200' />
            <span className='text-[11px] uppercase tracking-[0.08em] text-neutral-900/40'>
              or
            </span>
            <div className='h-px flex-1 bg-neutral-200' />
          </div>

          <SocialAuthButton />
        </FormikForm>
      )}
    </Formik>
  )
}
