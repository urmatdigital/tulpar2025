import { TrackingForm } from '@/components/TrackingForm'
import { DashboardStats } from '@/components/DashboardStats'

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
            TULPAR EXPRESS
          </h1>
          <p className="text-xl md:text-2xl text-center mb-12">
            Современный сервис отслеживания посылок
          </p>
          <TrackingForm />
        </div>
      </div>
      
      <section className="py-16">
        <div className="container">
          <DashboardStats />
        </div>
      </section>
    </main>
  )
}
