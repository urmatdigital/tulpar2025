'use client'

import React from 'react';
import { Copy, ChevronRight, Home, Wallet, ShoppingCart, Mail, MoreHorizontal, LogOut, Phone, MapPin, Search, Settings, HelpCircle, User, Bell, Package, Truck } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const ProfileScreen = () => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-50 min-h-screen">
      {/* Header with Avatar */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">Урмат Мырзабеков</h2>
              <div className="flex items-center gap-2 text-blue-500 mt-1">
                <span className="text-xs sm:text-sm font-medium">#TE-8963</span>
                <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5 cursor-pointer hover:text-blue-600" />
              </div>
            </div>
          </div>
          <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 cursor-pointer hover:text-blue-500" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4">
          <StatsCard icon={<Package className="w-4 h-4 sm:w-5 sm:h-5" />} title="Посылок" value="12" />
          <StatsCard icon={<Truck className="w-4 h-4 sm:w-5 sm:h-5" />} title="В пути" value="3" />
          <StatsCard icon={<MapPin className="w-4 h-4 sm:w-5 sm:h-5" />} title="На складе" value="2" />
        </div>
      </Card>

      {/* Address Section */}
      <Card className="mt-4 p-4 sm:p-6 mx-2 sm:mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-medium text-gray-800">Адрес склада в Китае</h3>
          <div className="px-2 sm:px-3 py-1 bg-blue-100 rounded-full">
            <span className="text-xs sm:text-sm text-blue-600">Активен</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <AddressItem 
            label="Адрес"
            value="广州市番禺区市广路钟二路段45号华家领航产业园1栋 107 思密特 1226308"
          />
          <AddressItem 
            label="Телефон"
            value="+8618924053083"
          />
          <AddressItem 
            label="ID номер"
            value="Si mi te (1226308)"
          />
        </div>
      </Card>

      {/* Menu Section */}
      <div className="mt-4 mx-2 sm:mx-4 bg-white rounded-2xl overflow-hidden">
        <MenuButton icon={<Phone className="w-5 h-5" />} text="Контактная информация" />
        <MenuButton icon={<MapPin className="w-5 h-5" />} text="Адреса складов" />
        <MenuButton icon={<Search className="w-5 h-5" />} text="Отслеживание" />
        <MenuButton icon={<Settings className="w-5 h-5" />} text="Настройки" />
        <MenuButton icon={<HelpCircle className="w-5 h-5" />} text="Помощь" />
        <MenuButton 
          icon={<LogOut className="w-5 h-5" />} 
          text="Выйти" 
          className="text-red-500"
        />
      </div>

      {/* Version */}
      <div className="text-center text-gray-500 text-xs sm:text-sm mt-6 sm:mt-8 mb-20">
        Версия приложения 3.0.69
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
        <div className="max-w-2xl mx-auto flex justify-around">
          <NavButton icon={<Home className="w-6 h-6" />} active />
          <NavButton icon={<Wallet className="w-6 h-6" />} />
          <NavButton icon={<ShoppingCart className="w-6 h-6" />} />
          <NavButton icon={<Mail className="w-6 h-6" />} />
          <NavButton icon={<MoreHorizontal className="w-6 h-6" />} />
        </div>
      </div>
    </div>
  );
};

// Stats Card Component
function StatsCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-gray-600">{title}</span>
      </div>
      <span className="text-xl font-semibold">{value}</span>
    </div>
  );
}

// Address Item Component
function AddressItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="space-y-1">
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-sm text-gray-900">{value}</div>
      </div>
      <Copy 
        className="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-600"
        onClick={() => navigator.clipboard.writeText(value)}
      />
    </div>
  );
}

// Menu Button Component
function MenuButton({ icon, text, className = "" }: { icon: React.ReactNode; text: string; className?: string }) {
  return (
    <button className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${className}`}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium text-gray-900">{text}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </button>
  );
}

// Nav Button Component
function NavButton({ icon, active = false }: { icon: React.ReactNode; active?: boolean }) {
  return (
    <button className={`p-2 rounded-lg ${active ? 'text-blue-500 bg-blue-50' : 'text-gray-500 hover:bg-gray-50'}`}>
      {icon}
    </button>
  );
}

export default ProfileScreen;
