'use client'

import { User, Bell, Copy } from 'lucide-react'

interface UserProfileProps {
  name: string
  userId: string
}

export function UserProfile({ name, userId }: UserProfileProps) {
  return (
    <div className="flex items-center justify-between mb-4 sm:mb-6">
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
          <User size={20} className="sm:w-6 sm:h-6 text-primary dark:text-primary/90" />
        </div>
        <div>
          <h2 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">{name}</h2>
          <div className="flex items-center gap-1.5 sm:gap-2 text-primary mt-0.5 sm:mt-1">
            <span className="text-xs sm:text-sm font-medium">#{userId}</span>
            <Copy 
              size={12} 
              className="cursor-pointer hover:text-primary/80 transition-colors"
              onClick={() => navigator.clipboard.writeText(userId)}
            />
          </div>
        </div>
      </div>
      <Bell size={18} className="sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 cursor-pointer hover:text-primary transition-colors" />
    </div>
  )
}
