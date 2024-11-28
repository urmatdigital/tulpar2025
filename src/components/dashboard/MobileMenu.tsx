'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, X, Package, History, Settings, MapPin, Phone, Send, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const menuItems = [
    {
      icon: Send,
      label: 'Отправить посылку',
      href: '/send'
    },
    {
      icon: Search,
      label: 'Отследить',
      href: '/track'
    },
    {
      icon: History,
      label: 'История отправлений',
      href: '/history'
    },
    {
      icon: MapPin,
      label: 'Пункты приема',
      href: '/locations'
    },
    {
      icon: Phone,
      label: 'Контакты',
      href: '/contacts'
    },
    {
      icon: Settings,
      label: 'Настройки',
      href: '/settings'
    }
  ]

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed bottom-4 right-4 z-50 bg-primary text-white rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
          <div className="fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-900 shadow-xl">
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="text-lg font-semibold">Меню</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="p-4 space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    router.push(item.href)
                    setIsOpen(false)
                  }}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
