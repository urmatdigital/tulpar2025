'use client'

import { useEffect } from 'react'
import { useStore } from '@/lib/store'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useStore((state: any) => state.setUser)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      }
    }

    initializeAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [setUser, supabase.auth])

  return children
}
