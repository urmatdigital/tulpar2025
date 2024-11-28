'use client'

import { Copy } from 'lucide-react'
import { Card } from '@/components/ui/Card'

interface AddressItemProps {
  label: string
  value: string
}

function AddressItem({ label, value }: AddressItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="text-sm sm:text-base text-gray-900 dark:text-white font-medium truncate">{value}</span>
        <Copy 
          size={14} 
          className="text-gray-400 dark:text-gray-500 cursor-pointer hover:text-primary transition-colors flex-shrink-0"
          onClick={() => navigator.clipboard.writeText(value)}
        />
      </div>
    </div>
  )
}

export function AddressSection() {
  return (
    <Card className="mt-3 p-3 sm:p-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
          Адрес склада в Китае
        </h3>
        <div className="px-2 sm:px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-full">
          <span className="text-xs sm:text-sm text-primary dark:text-primary/90">Активен</span>
        </div>
      </div>
      <div className="space-y-3 sm:space-y-4">
        <AddressItem 
          label="Адрес"
          value="广州市番禺区市广路钟二路段45号华家领航产业园1栋 107 思密特 1226308"
        />
        <AddressItem 
          label="Телефон"
          value="+8618924053083"
        />
        <AddressItem 
          label="Код получателя"
          value="Si mi te (1226308)"
        />
      </div>
    </Card>
  )
}
