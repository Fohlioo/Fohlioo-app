'use client'

import {
  useEffect,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState
} from 'react'
import { redirect, useRouter } from 'next/navigation'
import Reducer from './reducers/authreducer'
import { AuthContextInterface } from '@/interface'
import { NotificationPlacement, MessageType } from '@/types'

import { getSupabaseBrowserClient } from '@/lib/browser-client'
import type { SignUpWithEmailParams, SignInWithEmailParams } from '@/types'
import type { User } from '@supabase/supabase-js'



interface AuthContextType {
  user: null
  signUpWithEmail: (data: SignUpWithEmailParams) => Promise<void>
  signInWithEmail: (data: SignInWithEmailParams) => Promise<void>
  handleSetCurrentUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const initialState: AuthContextInterface = {
  user: null,
  openNotification: (
    placement: NotificationPlacement,
    message: MessageType
  ) => {}
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [status, setStatus] = useState<string>('idle')


  
  const supabase = getSupabaseBrowserClient()

  const signUpWithEmail = useCallback(
    async (data: SignUpWithEmailParams) => {
      const { email, password, firstName, lastName, acceptedTerms } = data

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            accepted_terms: acceptedTerms,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`
        },
      })

      if (error) {
        setStatus(error.message)
      } else {
        setStatus('Check your email for verification')
      }
    },
    [supabase]
  )

  const signInWithEmail = useCallback(async (data: SignInWithEmailParams) => {
    const { email, password } = data

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      
    })
    if (error) {
      setStatus(error.message)
    } else {
      setStatus('Signed in successfully')
    }
  }, [supabase])


  const handleSetCurrentUser = useCallback((user: User | null) => {
    setCurrentUser(user)
  }, [])

  const authContextValue = useMemo(
    () => ({
      ...state,
      signUpWithEmail,
      signInWithEmail,
      handleSetCurrentUser,
      dispatch
    }),
    [state, signUpWithEmail]
  )

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
