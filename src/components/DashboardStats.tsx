'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { useStore } from '@/lib/store'
import { useTranslation } from '@/hooks/useTranslation'
import type { Database } from '@/types/supabase'

type Package = Database['public']['Tables']['packages']['Row']

export default function DashboardStats() {
  const { t } = useTranslation()

  const stats = [
    { id: 'users', value: '8,000+' },
    { id: 'projects', value: '500+' },
    { id: 'tasks', value: '15,000+' },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {t('dashboard.stats.title')}
            </h2>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-gray-50 dark:bg-gray-700 p-8">
                <dt className="text-sm font-medium leading-6 text-gray-600 dark:text-gray-300">
                  {t(`dashboard.stats.${stat.id}`)}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
