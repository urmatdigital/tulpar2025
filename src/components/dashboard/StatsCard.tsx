'use client'

import React, { ReactNode } from 'react'

interface StatsCardProps {
  icon: ReactNode
  title: string
  value: string
}

export function StatsCard({ icon, title, value }: StatsCardProps) {
  const Icon = () => {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, {
        size: 16,
        className: 'sm:w-5 sm:h-5 text-primary dark:text-primary/90'
      })
    }
    return icon
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
        <div className="text-primary dark:text-primary/90">
          <Icon />
        </div>
        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">{title}</span>
      </div>
      <span className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{value}</span>
    </div>
  )
}
