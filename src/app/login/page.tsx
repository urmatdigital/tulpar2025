'use client'

import React, { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Mail, Lock, Eye, EyeOff, ChevronRight, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      router.push('/dashboard')
      router.refresh()
    } catch (error: any) {
      setError(error.message || 'Ошибка входа')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm">
        <Link href="/" className="flex items-center gap-2 text-gray-700">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Назад</span>
        </Link>
        <Link href="/register" className="text-sm text-blue-500 font-medium">
          Регистрация
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Logo */}
        <div className="mb-8 relative w-32 h-32">
          <Image
            src="/logo.png"
            alt="Tulpar Express Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        <Card className="w-full max-w-md p-6 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Добро пожаловать!</h1>
            <p className="text-sm text-gray-500">
              Войдите в свой аккаунт Tulpar Express
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@email.com"
                  required
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="password">
                Пароль
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
                <span className="text-sm text-gray-600">Запомнить меня</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-600">
                Забыли пароль?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-500/50 font-medium flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  Войти
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">или войдите через</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 p-2 border rounded-lg hover:bg-gray-50">
              <Image src="/google.svg" alt="Google" width={20} height={20} />
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 p-2 border rounded-lg hover:bg-gray-50">
              <Image src="/apple.svg" alt="Apple" width={20} height={20} />
              <span className="text-sm font-medium">Apple</span>
            </button>
          </div>
        </Card>

        <p className="mt-8 text-sm text-gray-500 text-center">
          Нет аккаунта?{' '}
          <Link href="/register" className="text-blue-500 hover:text-blue-600 font-medium">
            Зарегистрируйтесь
          </Link>
        </p>
      </div>
    </div>
  )
}
