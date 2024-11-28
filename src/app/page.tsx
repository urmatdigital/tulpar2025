'use client'

import { useTranslation } from '@/hooks/useTranslation'
import DashboardStats from '@/components/DashboardStats'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className="min-h-[calc(100vh-4rem)] py-3 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="z-50 bg-opacity-30 dark:bg-opacity-30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
            
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Доставка из Китая в Кыргызстан
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Быстрая и надежная доставка товаров из Китая. Отслеживание посылок в режиме реального времени.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Наши преимущества
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Отслеживание
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Следите за своими посылками в режиме реального времени на каждом этапе доставки
              </p>
            </div>
            <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Глобальная сеть
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Широкая сеть складов и партнеров в Китае для быстрой обработки ваших заказов
              </p>
            </div>
            <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Надежность
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Гарантируем сохранность ваших товаров и соблюдение сроков доставки
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Готовы начать?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Присоединяйтесь к тысячам довольных клиентов, которые уже пользуются нашими услугами
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600 dark:text-gray-300">
            2024 Tulpar Express. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  )
}
