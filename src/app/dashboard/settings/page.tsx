'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ArrowLeft, LogOut, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const logout = useStore((state) => state.logout)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  if (!mounted) return null

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>
        <h1 className="text-2xl font-semibold">Настройки</h1>
      </div>

      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Тема оформления</h3>
            <p className="text-sm text-muted-foreground">
              Выберите светлую или темную тему
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 mr-2" />
                Светлая
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 mr-2" />
                Темная
              </>
            )}
          </Button>
        </div>

        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-destructive">Опасная зона</h3>
              <p className="text-sm text-muted-foreground">
                Выход из системы
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
