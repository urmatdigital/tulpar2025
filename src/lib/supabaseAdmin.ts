import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = 'https://eacpkbrvpxhejgwyziwd.supabase.co'
const supabaseServiceKey = 'sbp_f2e846f3db4ab509385992fa663f65d3fb15c58e'

// Создаем клиент с сервисным ключом для полного доступа
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: false,
  },
  db: {
    schema: 'public'
  }
})

// Утилиты для работы с хранилищем S3
const s3Config = {
  accessKeyId: '5d02a30e03423dbe23aa33ac588b9906',
  secretAccessKey: '3cdc6ccf97b7c82decc9d87a48a96dcc65a4bc8bd73bfe06ba440d62b128d331',
  region: 'eu-central-1',
  endpoint: 'https://eacpkbrvpxhejgwyziwd.supabase.co/storage/v1/s3'
}

// Расширенное API для управления данными
export const adminApi = {
  // Управление пользователями
  users: {
    async createUser(userData: {
      telegram_id?: string
      username?: string
      full_name?: string
      email?: string
      phone?: string
      role?: string
    }) {
      const { data, error } = await supabaseAdmin
        .from('users')
        .insert(userData)
        .select()
        .single()
      
      if (error) throw error
      return data
    },

    async updateUser(userId: string, userData: Partial<Database['public']['Tables']['users']['Update']>) {
      const { data, error } = await supabaseAdmin
        .from('users')
        .update(userData)
        .eq('id', userId)
        .select()
        .single()
      
      if (error) throw error
      return data
    },

    async deleteUser(userId: string) {
      const { error } = await supabaseAdmin
        .from('users')
        .delete()
        .eq('id', userId)
      
      if (error) throw error
    },

    async getAllUsers() {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    }
  },

  // Управление посылками
  packages: {
    async createPackage(packageData: {
      tracking_number: string
      status?: string
      current_location?: string
      estimated_delivery?: string
      user_id?: string
      weight?: number
      dimensions?: any
      description?: string
    }) {
      const { data, error } = await supabaseAdmin
        .from('packages')
        .insert(packageData)
        .select()
        .single()
      
      if (error) throw error
      return data
    },

    async updatePackage(packageId: string, packageData: Partial<Database['public']['Tables']['packages']['Update']>) {
      const { data, error } = await supabaseAdmin
        .from('packages')
        .update(packageData)
        .eq('id', packageId)
        .select()
        .single()
      
      if (error) throw error
      return data
    },

    async deletePackage(packageId: string) {
      const { error } = await supabaseAdmin
        .from('packages')
        .delete()
        .eq('id', packageId)
      
      if (error) throw error
    },

    async getAllPackages() {
      const { data, error } = await supabaseAdmin
        .from('packages')
        .select('*, users(*)')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    },

    async getPackagesByUser(userId: string) {
      const { data, error } = await supabaseAdmin
        .from('packages')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    }
  },

  // Управление историей отслеживания
  tracking: {
    async addTrackingEntry(trackingData: {
      package_id: string
      status: string
      location?: string
      notes?: string
    }) {
      const { data, error } = await supabaseAdmin
        .from('tracking_history')
        .insert({
          ...trackingData,
          timestamp: new Date().toISOString()
        })
        .select()
        .single()
      
      if (error) throw error
      return data
    },

    async getPackageHistory(packageId: string) {
      const { data, error } = await supabaseAdmin
        .from('tracking_history')
        .select('*')
        .eq('package_id', packageId)
        .order('timestamp', { ascending: false })
      
      if (error) throw error
      return data
    },

    async deleteTrackingEntry(entryId: string) {
      const { error } = await supabaseAdmin
        .from('tracking_history')
        .delete()
        .eq('id', entryId)
      
      if (error) throw error
    }
  },

  // Управление базой данных
  database: {
    async createTable(tableName: string, columns: Record<string, string>) {
      const columnDefinitions = Object.entries(columns)
        .map(([name, type]) => `${name} ${type}`)
        .join(', ')

      const { error } = await supabaseAdmin.rpc('create_table', {
        table_name: tableName,
        column_definitions: columnDefinitions
      })

      if (error) throw error
    },

    async alterTable(tableName: string, operation: string) {
      const { error } = await supabaseAdmin.rpc('alter_table', {
        table_name: tableName,
        alter_operation: operation
      })

      if (error) throw error
    },

    async dropTable(tableName: string) {
      const { error } = await supabaseAdmin.rpc('drop_table', {
        table_name: tableName
      })

      if (error) throw error
    }
  },

  // Управление хранилищем
  storage: {
    async uploadFile(bucket: string, path: string, file: File) {
      const { data, error } = await supabaseAdmin
        .storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) throw error
      return data
    },

    async deleteFile(bucket: string, path: string) {
      const { error } = await supabaseAdmin
        .storage
        .from(bucket)
        .remove([path])

      if (error) throw error
    },

    async listFiles(bucket: string, path?: string) {
      const { data, error } = await supabaseAdmin
        .storage
        .from(bucket)
        .list(path)

      if (error) throw error
      return data
    },

    async createBucket(bucketName: string, isPublic: boolean = false) {
      const { data, error } = await supabaseAdmin
        .storage
        .createBucket(bucketName, {
          public: isPublic,
          fileSizeLimit: 52428800 // 50MB
        })

      if (error) throw error
      return data
    },

    async deleteBucket(bucketName: string) {
      const { error } = await supabaseAdmin
        .storage
        .deleteBucket(bucketName)

      if (error) throw error
    }
  }
}
