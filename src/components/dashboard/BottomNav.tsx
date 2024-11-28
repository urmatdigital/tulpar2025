'use client'

import { Home, Wallet, ShoppingCart, Mail, MoreHorizontal } from 'lucide-react'
import { ReactNode } from 'react'

interface NavButtonProps {
  icon: ReactNode
  active?: boolean
  onClick?: () => void
}

function NavButton({ icon, active = false, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg cursor-pointer transition-colors
        ${active 
          ? 'text-primary dark:text-primary/90 bg-primary/10 dark:bg-primary/20' 
          : 'text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary/90 hover:bg-gray-100 dark:hover:bg-gray-700/50'
        }`}
    >
      {icon}
    </button>
  )
}

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center p-3 sm:p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 backdrop-blur-lg bg-opacity-90">
      <NavButton icon={<Home size={24} />} active />
      <NavButton icon={<Wallet size={24} />} />
      <NavButton icon={<ShoppingCart size={24} />} />
      <NavButton icon={<Mail size={24} />} />
      <NavButton icon={<MoreHorizontal size={24} />} />
    </div>
  )
}
