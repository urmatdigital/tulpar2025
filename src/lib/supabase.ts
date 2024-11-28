import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'

// Создаем единый экземпляр клиента
export const supabase = createClientComponentClient<Database>()

// Экспортируем функцию для получения клиента в middleware
export const createServerSupabaseClient = () => createClientComponentClient<Database>()
