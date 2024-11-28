import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from './supabase'

interface UserState {
  user: any | null
  loading: boolean
  error: string | null
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
            error: error.message === 'User already registered'
              ? 'Пользователь с таким email уже существует'
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
          set({ user: null })
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
