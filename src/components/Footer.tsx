'use client'

import Link from 'next/link'
import { Logo } from '@/assets/logo'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Логотип и информация о компании */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Logo className="h-8 w-auto" />
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  TULPAR <span className="text-blue-600 dark:text-blue-400">EXPRESS</span>
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Высокое качество логистических и транспортных услуг
              </p>
            </div>

            {/* Быстрые ссылки */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase">
                Навигация
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    О нас
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    Услуги
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    Контакты
                  </Link>
                </li>
              </ul>
            </div>

            {/* Контактная информация */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase">
                Контакты
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>Телефон: +996 (501) 18-88-38</li>
                <li>Email: info@te.kg</li>
                <li>Адрес: г. Бишкек, ул.Ахматбека Суюмбаева, 123/1</li><li>Адрес: г. Ош, ул. Примерная, 123</li><li>Адрес: г. Талас>, ул. Примерная, 123</li>
              </ul>
            </div>
          </div>

          {/* Авторские права */}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-4">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              {new Date().getFullYear()} Tulpar Express. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
