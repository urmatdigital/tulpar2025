'use client'

import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'secondary'
}

export function Card({ 
  children, 
  className, 
  variant = 'default',
  ...props 
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg shadow-sm p-4',
        variant === 'default' && 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
        variant === 'secondary' && 'bg-gray-50 dark:bg-gray-900',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
