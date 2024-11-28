'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { UserProfile } from '@/components/dashboard/UserProfile'
import { StatsGrid } from '@/components/dashboard/StatsGrid'
import { AddressSection } from '@/components/dashboard/AddressSection'
import { MenuSection } from '@/components/dashboard/MenuSection'
import { BottomNav } from '@/components/dashboard/BottomNav'
import { Card } from '@/components/ui/Card'

export default function DashboardPage() {
  const router = useRouter()
  const user = useStore((state) => state.user)

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <>
      {/* Header with Avatar */}
      <Card className="p-4 sm:p-6">
        <UserProfile name="Урмат Мырзабеков" userId="TE-8963" />
        <StatsGrid />
      </Card>

      <AddressSection />
      <MenuSection />

      {/* Version */}
      <div className="text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-6 sm:mt-8 mb-20">
        Версия приложения 3.0.69
      </div>

      <BottomNav />
    </>
  )
}
