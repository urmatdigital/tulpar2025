'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useStore } from '@/lib/store'
import { Logo } from '@/assets/logo'
import ThemeToggle from './ThemeToggle'
import MobileMenu from './MobileMenu'
import { Card } from './ui/Card'
import { Container } from './ui/Container'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const user = useStore((state) => state.user)
  const logout = useStore((state) => state.logout)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      // Принудительно перенаправляем на страницу входа
      router.push('/login')
      // Очищаем историю навигации
      router.refresh()
    } catch (error) {
      console.error('Ошибка при выходе:', error)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur-sm">
      <Container>
        <Card className="flex w-full items-center justify-between py-3 rounded-xl sm:rounded-2xl">
          {/* Logo and Company Name - Always visible */}
          <div className="flex items-center flex-1">
            <Link href="/" className="flex items-center gap-3">
              <Logo className="h-10 w-auto" />
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-wide md:leading-normal leading-tight">
                TULPAR <span className="text-blue-600 dark:text-blue-400">EXPRESS</span>
              </span>
            </Link>
          </div>
          
          {/* Right Side Controls - Consistent across all sizes */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle - Always visible */}
            <ThemeToggle />

            {/* Authentication Buttons - Both Mobile and Desktop */}
            {!user && (
              <>
                {/* Mobile Auth Buttons */}
                <div className="md:hidden flex items-center gap-2">
                  <Link
                    href="/login"
                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-500"
                  >
                    Войти
                  </Link>
                </div>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                  <Link
                    href="/login"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-500"
                  >
                    Войти
                  </Link>
                </div>
              </>
            )}

            {/* User Menu - When Logged In */}
            {user && (
              <>
                {/* Mobile User Menu */}
                <div className="md:hidden flex items-center gap-2">
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Профиль
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Выйти
                  </button>
                </div>

                {/* Desktop User Menu */}
                <div className="hidden md:flex items-center gap-4">
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Личный кабинет
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Выйти
                  </button>
                </div>
              </>
            )}
          </div>
        </Card>
      </Container>

      {/* Mobile Menu - Only for Logged In Users */}
      {user && (
        <MobileMenu
          isOpen={showMobileMenu}
          onClose={() => setShowMobileMenu(false)}
        />
      )}
    </header>
  )
}
