'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, User2, LogOut } from 'lucide-react'
import { useStore } from '@/lib/store'
import { Logo } from '@/assets/logo'
import ThemeToggle from './ThemeToggle'
import { Card } from './ui/Card'
import { Container } from './ui/Container'
import { useRouter } from 'next/navigation'
import { Button } from './ui/Button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/Sheet'

export default function Header() {
  const [open, setOpen] = useState(false)
  const user = useStore((state) => state.user)
  const logout = useStore((state) => state.logout)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
      router.refresh()
      setOpen(false)
    } catch (error) {
      console.error('Ошибка при выходе:', error)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur-sm">
      <Container>
        <Card variant="outline" padding="sm" className="flex w-full items-center justify-between rounded-xl sm:rounded-2xl">
          {/* Логотип */}
          <div className="flex items-center flex-1">
            <Link href="/" className="flex items-center gap-3">
              <Logo className="h-8 w-auto sm:h-10" />
              <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                TULPAR <span className="text-blue-600 dark:text-blue-400">EXPRESS</span>
              </span>
            </Link>
          </div>
          
          {/* Правая часть */}
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />

            {!user ? (
              <>
                {/* Кнопка входа - мобильная */}
                <Link
                  href="/login"
                  className="md:hidden rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-500"
                >
                  Войти
                </Link>

                {/* Кнопка входа - десктоп */}
                <Link
                  href="/login"
                  className="hidden md:block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-500"
                >
                  Войти
                </Link>
              </>
            ) : (
              <>
                {/* Меню пользователя - десктоп */}
                <div className="hidden md:flex items-center gap-4">
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Личный кабинет
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                  >
                    Выйти
                  </Button>
                </div>

                {/* Меню пользователя - мобильное */}
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="md:hidden"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent 
                    side="right" 
                    className="w-[300px] sm:w-[400px]"
                    description="Навигационное меню для мобильных устройств"
                  >
                    <SheetHeader>
                      <SheetTitle>Меню</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-4 mt-6">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        onClick={() => setOpen(false)}
                      >
                        <User2 className="h-4 w-4" />
                        Личный кабинет
                      </Link>
                      <Button
                        variant="outline"
                        className="justify-start"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Выйти
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </>
            )}
          </div>
        </Card>
      </Container>
    </header>
  )
}
