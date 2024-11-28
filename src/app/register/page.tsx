'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Mail, Lock, Eye, EyeOff, ChevronRight, ArrowLeft, User, Phone } from 'lucide-react'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const register = useStore((state) => state.register)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const session = await register(email, password, name, phone)
      if (session) {
        router.replace('/dashboard')
      } else {
        setError('Не удалось войти в систему. Пожалуйста, попробуйте снова.')
      }
    } catch (err: any) {
      // Показываем пользователю понятное сообщение об ошибке
      setError(err.message || 'Произошла ошибка при регистрации')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Back Button - Mobile Only */}
      <div className="p-4 md:hidden">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Назад
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md p-6 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Создать аккаунт</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Введите свои данные для регистрации
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Имя
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="Ваше имя"
                />
                <User className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="example@email.com"
                />
                <Mail className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>

            {/* Phone Input */}
            <div className="space-y-1">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Телефон (необязательно)
              </label>
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="+7 (999) 999-99-99"
                />
                <Phone className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Пароль
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="••••••••"
                />
                <Lock className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-500 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                'Загрузка...'
              ) : (
                <>
                  Создать аккаунт
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">Уже есть аккаунт? </span>
            <Link href="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              Войти
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
