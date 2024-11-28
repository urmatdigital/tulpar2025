import React from 'react';
import { Copy, ChevronRight, Home, Wallet, ShoppingCart, Mail, MoreHorizontal, LogOut, Phone, MapPin, Search, Settings, HelpCircle, User, Bell, Package, Truck } from 'lucide-react';

const ProfileScreen = () => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-50 min-h-screen">
      {/* Header with Avatar */}
      <div className="p-4 sm:p-6 bg-white rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={24} sm:size={32} className="text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">Урмат Мырзабеков</h2>
              <div className="flex items-center gap-2 text-blue-500 mt-1">
                <span className="text-xs sm:text-sm font-medium">#TE-8963</span>
                <Copy size={12} sm:size={14} className="cursor-pointer hover:text-blue-600" />
              </div>
            </div>
          </div>
          <Bell size={20} sm:size={24} className="text-gray-500 cursor-pointer hover:text-blue-500" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4">
          <StatsCard icon={<Package />} title="Посылок" value="12" />
          <StatsCard icon={<Truck />} title="В пути" value="3" />
          <StatsCard icon={<MapPin />} title="На складе" value="2" />
        </div>
      </div>

      {/* Address Section */}
      <div className="mt-4 p-4 sm:p-6 bg-white rounded-2xl mx-2 sm:mx-4">
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
            label="Код получателя"
            value="Si mi te (1226308)"
          />
        </div>
      </div>

      {/* Menu Items */}
      <div className="mt-4 mx-2 sm:mx-4 bg-white rounded-2xl overflow-hidden">
        <MenuButton icon={<Phone className="text-blue-500" />} text="Контактная информация" />
        <MenuButton icon={<MapPin className="text-green-500" />} text="Адреса складов" />
        <MenuButton icon={<Search className="text-purple-500" />} text="Отслеживание" />
        <MenuButton icon={<Settings className="text-gray-500" />} text="Настройки" />
        <MenuButton icon={<HelpCircle className="text-orange-500" />} text="Помощь" />
        <MenuButton icon={<LogOut className="text-red-500" />} text="Выйти" className="text-red-500" />
      </div>

      {/* Version */}
      <div className="text-center text-gray-500 text-xs sm:text-sm mt-6 sm:mt-8 mb-20">
        Версия приложения 3.0.69
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center p-3 sm:p-4 bg-white border-t">
        <NavButton icon={<Home />} active />
        <NavButton icon={<Wallet />} />
        <NavButton icon={<ShoppingCart />} />
        <NavButton icon={<Mail />} />
        <NavButton icon={<MoreHorizontal />} />
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) => (
  <div className="bg-gray-50 p-3 rounded-xl">
    <div className="flex items-center gap-2 mb-2">
      <div className="text-blue-500">{icon}</div>
      <span className="text-sm text-gray-600">{title}</span>
    </div>
    <span className="text-xl font-semibold">{value}</span>
  </div>
);

// Address Item Component
const AddressItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-2">
    <div className="space-y-1">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-sm">{value}</div>
    </div>
    <Copy size={16} className="text-blue-500 cursor-pointer hover:text-blue-600" />
  </div>
);

// Menu Button Component
const MenuButton = ({ icon, text, className = "" }: { icon: React.ReactNode; text: string; className?: string }) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
    <div className="flex items-center gap-3">
      {icon}
      <span className={`${className} font-medium`}>{text}</span>
    </div>
    <ChevronRight className="text-gray-400" />
  </div>
);

// Nav Button Component
const NavButton = ({ icon, active = false }: { icon: React.ReactNode; active?: boolean }) => (
  <div className={`p-2 rounded-lg cursor-pointer ${active ? 'text-blue-500' : 'text-gray-400'}`}>
    {icon}
  </div>
);

export default ProfileScreen;
