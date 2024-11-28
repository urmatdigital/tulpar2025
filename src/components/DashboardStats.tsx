'use client'

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Активные отправления</h3>
        <p className="text-3xl font-bold text-primary">245</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Доставлено сегодня</h3>
        <p className="text-3xl font-bold text-primary">52</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Среднее время доставки</h3>
        <p className="text-3xl font-bold text-primary">4.5 дня</p>
      </div>
    </div>
  )
}
