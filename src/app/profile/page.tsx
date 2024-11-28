'use client'

import React from 'react'
import { User, Copy, Bell, Package, Truck, MapPin } from 'lucide-react'
import { useStore } from '@/lib/store'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { AddressSection } from '@/components/dashboard/AddressSection'
import { BottomNav } from '@/components/dashboard/BottomNav'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header with Avatar */}
      <Card className="p-4 sm:p-6 rounded-b-2xl">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Урмат Мырзабеков</h2>
              <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400 mt-1">
                <span className="text-xs sm:text-sm font-medium">#TE-8963</span>
                <Copy 
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 cursor-pointer hover:text-blue-600 dark:hover:text-blue-300"
                  onClick={() => navigator.clipboard.writeText('TE-8963')}
                />
              </div>
            </div>
          </div>
          <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-400 cursor-pointer hover:text-blue-500 dark:hover:text-blue-400" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <StatsCard icon={<Package />} title="Посылок" value="12" />
          <StatsCard icon={<Truck />} title="В пути" value="3" />
          <StatsCard icon={<MapPin />} title="На складе" value="2" />
        </div>
      </Card>

      {/* Address Section */}
      <Card className="mt-4 p-4 sm:p-6 mx-2 sm:mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200">Адрес склада в Китае</h3>
          <div className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/50 rounded-full">
            <span className="text-xs sm:text-sm text-blue-600 dark:text-blue-400">Активен</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <AddressSection 
            label="Адрес"
            value="广州市番禺区市广路钟二路段45号华家领航产业园1栋 107 思密特 1226308"
          />
          <AddressSection 
            label="Телефон"
            value="+8618924053083"
          />
          <AddressSection 
            label="ID номер"
            value="Si mi te (1226308)"
          />
        </div>
      </Card>

      {/* Version */}
      <div className="text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-6 sm:mt-8 mb-20">
        Версия приложения 3.0.69
      </div>

      <BottomNav />
    </div>
  )
}
