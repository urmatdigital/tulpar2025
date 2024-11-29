'use client'

import { useEffect, useState } from 'react'
import { User2, Settings, Copy, Edit, Phone, Calendar, Hash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

interface ClientData {
  full_name: string
  phone: string
  client_number: string
  created_at: string
}

export function UserProfile() {
  const [mounted, setMounted] = useState(false)
  const [client, setClient] = useState<ClientData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const user = useStore((state) => state.user)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !user) return

    const fetchClientData = async () => {
      try {
        const { data: clientData, error } = await supabase
          .from('clients')
          .select('full_name, phone, client_number, created_at')
          .eq('user_id', user.id)
          .maybeSingle()

        if (error) {
          console.error('Error fetching client data:', error)
          return
        }

        setClient(clientData)
      } catch (error) {
        console.error('Error in fetchClientData:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClientData()
  }, [mounted, user])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // Можно добавить toast уведомление о успешном копировании
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!mounted || !user) return null

  if (loading) {
    return (
      <Card variant="default" padding="lg" className="w-full animate-pulse">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="space-y-4 flex-1">
            <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="space-y-2">
              <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  if (!client) {
    return (
      <Card variant="default" padding="lg" className="w-full">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <User2 className="w-12 h-12 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">{user.email}</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.push('/dashboard/profile/edit')}
            >
              <Edit className="w-4 h-4 mr-2" />
              Заполнить данные
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card variant="default" padding="lg" className="w-full">
      <div className="space-y-6">
        {/* Основная информация */}
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <User2 className="w-12 h-12 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-2xl font-semibold">{client.full_name}</h2>
              <span className="text-sm text-muted-foreground">
                с {formatDate(client.created_at)}
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">Телефон</div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{client.phone}</span>
                      <button
                        onClick={() => copyToClipboard(client.phone)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        title="Копировать телефон"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Hash className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">Номер клиента</div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{client.client_number}</span>
                      <button
                        onClick={() => copyToClipboard(client.client_number)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        title="Копировать номер клиента"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-start gap-2 md:mt-0 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  onClick={() => router.push('/dashboard/profile/edit')}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Редактировать
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  onClick={() => router.push('/dashboard/settings')}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Настройки
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
