'use client'

import { useTranslation } from '@/hooks/useTranslation'
import DashboardStats from '@/components/DashboardStats'

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 geometric-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t('home.hero.subtitle')}
              </p>
              <button className="btn-primary mt-8">
                {t('home.hero.cta')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">
                {t('home.features.tracking.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('home.features.tracking.description')}
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">
                {t('home.features.global.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('home.features.global.description')}
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">
                {t('home.features.support.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('home.features.support.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <DashboardStats />
        </div>
      </section>
    </div>
  )
}
