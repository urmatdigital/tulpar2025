'use client'

import { useState } from 'react'
import { api } from '@/lib/api'
import { useStore } from '@/lib/store'

export function TrackingForm() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const addPackage = useStore((state) => state.addPackage)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const package_ = await api.packages.getByTrackingNumber(trackingNumber)
      addPackage(package_)
      setTrackingNumber('')
    } catch (err) {
      setError('Посылка не найдена. Пожалуйста, проверьте номер отслеживания.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Введите трек-номер"
            className="flex-1 px-4 py-2 rounded-lg text-gray-900"
            required
            disabled={loading}
          />
          <button 
            type="submit" 
            className="btn-secondary disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Поиск...' : 'Отследить'}
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}
      </div>
    </form>
  )
}
