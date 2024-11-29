'use client'

import { useRouter } from 'next/navigation'
import { Send, Search, History } from 'lucide-react'
import { UserProfile } from '@/components/dashboard/UserProfile'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { AddressSection } from '@/components/dashboard/AddressSection'
import { ContactsSection } from '@/components/dashboard/ContactsSection'
import { LocationsSection } from '@/components/dashboard/LocationsSection'
import { MobileMenu } from '@/components/dashboard/MobileMenu'
import { useEffect, useState } from 'react'
import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const router = useRouter()
  const { user, setUser } = useStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error || !session) {
        router.replace('/login')
        return
      }
      setUser(session.user)
    }

    if (mounted) {
      checkSession()
    }
  }, [router, setUser, mounted])

  useEffect(() => {
    if (!mounted) return

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/login')
        return
      }
      setUser(session.user)
    })

    return () => subscription.unsubscribe()
  }, [router, setUser, mounted])

  if (!mounted || !user) {
    return null
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid gap-6">
        <UserProfile />
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <StatsCard
            icon={Send}
            title="Активные отправления"
            value="0"
            description="В пути"
            trend="neutral"
            trendValue="0%"
          />
          <StatsCard
            icon={Search}
            title="Ожидают отправки"
            value="0"
            description="На складе"
            trend="neutral"
            trendValue="0%"
          />
          <StatsCard
            icon={History}
            title="Всего отправлений"
            value="0"
            description="За все время"
            trend="neutral"
            trendValue="0%"
          />
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <AddressSection />
          <ContactsSection />
          <LocationsSection />
        </div>
      </div>
      
      <MobileMenu />
    </div>
  )
}
