'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Package, MapPin, DollarSign } from 'lucide-react'

export default function SendPage() {
  const router = useRouter()
  const user = useStore((state) => state.user)
  const [loading, setLoading] = useState(false)

  // Состояния для формы
  const [packageDetails, setPackageDetails] = useState({
    weight: '',
    dimensions: '',
    description: '',
    fromAddress: '',
    toAddress: '',
    recipientName: '',
    recipientPhone: ''
  })

  if (!user) {
    router.replace('/login')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // TODO: Implement package submission logic
      console.log('Package details:', packageDetails)
      
      // Перенаправляем на страницу подтверждения
      router.push('/send/confirmation')
    } catch (error) {
      console.error('Error submitting package:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Отправить посылку
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Package className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Детали посылки</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Вес (кг)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={packageDetails.weight}
                    onChange={(e) => setPackageDetails({...packageDetails, weight: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dimensions">Размеры (см)</Label>
                  <Input
                    id="dimensions"
                    placeholder="ДxШxВ"
                    value={packageDetails.dimensions}
                    onChange={(e) => setPackageDetails({...packageDetails, dimensions: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Описание посылки</Label>
                <Input
                  id="description"
                  value={packageDetails.description}
                  onChange={(e) => setPackageDetails({...packageDetails, description: e.target.value})}
                  required
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary mb-4">
                <MapPin className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Адреса</h2>
              </div>

              <div>
                <Label htmlFor="fromAddress">Адрес отправления</Label>
                <Input
                  id="fromAddress"
                  value={packageDetails.fromAddress}
                  onChange={(e) => setPackageDetails({...packageDetails, fromAddress: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="toAddress">Адрес доставки</Label>
                <Input
                  id="toAddress"
                  value={packageDetails.toAddress}
                  onChange={(e) => setPackageDetails({...packageDetails, toAddress: e.target.value})}
                  required
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary mb-4">
                <DollarSign className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Получатель</h2>
              </div>

              <div>
                <Label htmlFor="recipientName">ФИО получателя</Label>
                <Input
                  id="recipientName"
                  value={packageDetails.recipientName}
                  onChange={(e) => setPackageDetails({...packageDetails, recipientName: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="recipientPhone">Телефон получателя</Label>
                <Input
                  id="recipientPhone"
                  type="tel"
                  value={packageDetails.recipientPhone}
                  onChange={(e) => setPackageDetails({...packageDetails, recipientPhone: e.target.value})}
                  required
                />
              </div>
            </div>
          </Card>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Отправка...' : 'Отправить посылку'}
          </Button>
        </form>
      </div>
    </div>
  )
}
