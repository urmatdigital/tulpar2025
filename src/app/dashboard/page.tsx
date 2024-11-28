'use client'

import { useRouter } from 'next/navigation'
import { Send, Search, History } from 'lucide-react'
import { UserProfile } from '@/components/dashboard/UserProfile'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { AddressSection } from '@/components/dashboard/AddressSection'
import { ContactsSection } from '@/components/dashboard/ContactsSection'
import { LocationsSection } from '@/components/dashboard/LocationsSection'
import { MobileMenu } from '@/components/dashboard/MobileMenu'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
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

  // Предотвращаем гидратацию
  if (!mounted) {
    return null
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <Card className="p-6 rounded-2xl mb-6">
          <UserProfile />
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Button
            className="h-auto py-6 flex flex-col items-center gap-2 rounded-xl"
            onClick={() => router.push('/send')}
          >
            <Send className="w-6 h-6" />
            <span>Отправить посылку</span>
          </Button>
          <Button
            className="h-auto py-6 flex flex-col items-center gap-2 rounded-xl"
            onClick={() => router.push('/track')}
            variant="secondary"
          >
            <Search className="w-6 h-6" />
            <span>Отследить посылку</span>
          </Button>
          <Button
            className="h-auto py-6 flex flex-col items-center gap-2 rounded-xl"
            onClick={() => router.push('/history')}
            variant="outline"
          >
            <History className="w-6 h-6" />
            <span>История отправлений</span>
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6 rounded-xl">
            <StatsCard
              title="Отправлено"
              value="0"
              description="посылок"
              trend="up"
              trendValue="0%"
            />
          </Card>
          <Card className="p-6 rounded-xl">
            <StatsCard
              title="В пути"
              value="0"
              description="посылок"
              trend="none"
              trendValue="0%"
            />
          </Card>
          <Card className="p-6 rounded-xl">
            <StatsCard
              title="Доставлено"
              value="0"
              description="посылок"
              trend="none"
              trendValue="0%"
            />
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <Card className="p-6 rounded-xl">
              <AddressSection />
            </Card>
            <Card className="p-6 rounded-xl">
              <ContactsSection />
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card className="p-6 rounded-xl">
              <LocationsSection />
            </Card>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </div>
  )
}
