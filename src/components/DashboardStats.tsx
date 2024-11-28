'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { useStore } from '@/lib/store'
import { useTranslation } from '@/hooks/useTranslation'
import type { Database } from '@/types/supabase'
import type { TranslationKey } from '@/types/translations'

type Package = Database['public']['Tables']['packages']['Row']
type StatId = 'users' | 'projects' | 'tasks'

interface Stat {
  id: StatId
  value: string
  translationKey: TranslationKey
}

export default function DashboardStats() {
  const { t } = useTranslation()

  const stats: Stat[] = [
    { id: 'users', value: '8,000+', translationKey: 'dashboard.stats.users' },
    { id: 'projects', value: '500+', translationKey: 'dashboard.stats.projects' },
    { id: 'tasks', value: '15,000+', translationKey: 'dashboard.stats.tasks' },
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
                  {t(stat.translationKey)}
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
