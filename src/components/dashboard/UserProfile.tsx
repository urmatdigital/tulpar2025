'use client'

import { useEffect, useState } from 'react'
import { User2, Settings, Copy } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'

interface ClientData {
  full_name: string
  phone: string
  client_number: string
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
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (error) {
          console.error('Error fetching client data:', error)
          return
        }

        if (clientData) {
          setClient(clientData)
        }
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

  if (!mounted || !user) return null

  if (loading) {
    return (
      <div className="flex items-center gap-4 animate-pulse">
        <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="space-y-3">
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <User2 className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{user.email}</h2>
          <p className="text-muted-foreground">
            Данные клиента не найдены
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <User2 className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{client.full_name}</h2>
          <div className="text-muted-foreground space-y-1">
            <div className="flex items-center gap-2">
              <span>Код клиента: {client.client_number}</span>
              <button 
                onClick={() => copyToClipboard(client.client_number)}
                className="hover:text-primary transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <p>Телефон: {client.phone || 'Не указан'}</p>
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full md:w-auto"
        onClick={() => router.push('/settings')}
      >
        <Settings className="w-4 h-4 mr-2" />
        Настройки профиля
      </Button>
    </div>
  )
}
