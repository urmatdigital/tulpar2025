'use client'

import { useState } from 'react'

export function TrackingForm() {
  const [trackingNumber, setTrackingNumber] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement tracking logic
    console.log('Tracking number:', trackingNumber)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex gap-4">
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="Введите трек-номер"
          className="flex-1 px-4 py-2 rounded-lg text-gray-900"
          required
        />
        <button type="submit" className="btn-secondary">
          Отследить
        </button>
      </div>
    </form>
  )
}
