'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useStore } from '@/lib/store'
import { Logo } from '@/assets/logo'
import ThemeToggle from './ThemeToggle'
import AuthModal from './AuthModal'
import MobileMenu from './MobileMenu'
import { Card } from './ui/Card'
import { Container } from './ui/Container'

export default function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const user = useStore((state) => state.user)
  const logout = useStore((state) => state.logout)

  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur-sm">
      <Container>
        <Card className="flex w-full items-center justify-between py-3 rounded-xl sm:rounded-2xl">
          {/* Logo and Company Name - Always visible */}
          <div className="flex items-center flex-1">
            <Link href="/" className="flex items-center gap-3">
              <Logo className="h-10 w-auto" />
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-wide">
                TULPAR <span className="text-blue-600 dark:text-blue-400">EXPRESS</span>
              </span>
            </Link>
          </div>
          
          {/* Right Side Controls - Consistent across all sizes */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle - Always visible */}
            <ThemeToggle />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Личный кабинет
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Выйти
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-500"
                >
                  Войти
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setShowMobileMenu(true)}
              >
                <span className="sr-only">Открыть меню</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Card>
      </Container>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
      />

      {/* Auth Modal */}
      <AuthModal 
        show={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </header>
  )
}
