import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from './supabase'
import type { Database } from '@/types/supabase'

type Package = Database['public']['Tables']['packages']['Row']

interface UserState {
  user: any | null
  loading: boolean
  error: string | null
  packages: Package[]
  addPackage: (package_: Package) => void
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const useStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      packages: [],

      addPackage: (package_: Package) => {
        set((state) => ({
          packages: [...state.packages, package_]
        }))
      },

      login: async (email: string, password: string) => {
        set({ loading: true, error: null })
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })
          if (error) throw error
          set({ user: data.user })
        } catch (error: any) {
          set({ 
            error: error.message === 'Invalid login credentials'
              ? 'Неверный email или пароль'
              : 'Ошибка при входе в систему'
          })
          throw error
        } finally {
          set({ loading: false })
        }
      },

      signup: async (email: string, password: string) => {
        set({ loading: true, error: null })
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          })
          if (error) throw error
          set({ user: data.user })
        } catch (error: any) {
          set({ 
            error: error.message === 'Email already registered'
              ? 'Этот email уже зарегистрирован'
              : 'Ошибка при регистрации'
          })
          throw error
        } finally {
          set({ loading: false })
        }
      },

      logout: async () => {
        set({ loading: true, error: null })
        try {
          const { error } = await supabase.auth.signOut()
          if (error) throw error
          set({ user: null, packages: [] })
        } catch (error: any) {
          set({ error: 'Ошибка при выходе из системы' })
          throw error
        } finally {
          set({ loading: false })
        }
      },
    }),
    {
      name: 'user-storage',
    }
  )
)
