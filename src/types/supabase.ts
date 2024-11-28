export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      packages: {
        Row: {
          id: string
          tracking_number: string
          status: string
          current_location: string | null
          estimated_delivery: string | null
          created_at: string
          updated_at: string
          user_id: string | null
          weight: number | null
          dimensions: Json | null
          description: string | null
        }
        Insert: {
          id?: string
          tracking_number: string
          status?: string
          current_location?: string | null
          estimated_delivery?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string | null
          weight?: number | null
          dimensions?: Json | null
          description?: string | null
        }
        Update: {
          id?: string
          tracking_number?: string
          status?: string
          current_location?: string | null
          estimated_delivery?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string | null
          weight?: number | null
          dimensions?: Json | null
          description?: string | null
        }
      }
      users: {
        Row: {
          id: string
          telegram_id: string | null
          username: string | null
          full_name: string | null
          email: string | null
          phone: string | null
          role: string
          created_at: string
          updated_at: string
          last_login: string | null
        }
        Insert: {
          id?: string
          telegram_id?: string | null
          username?: string | null
          full_name?: string | null
          email?: string | null
          phone?: string | null
          role?: string
          created_at?: string
          updated_at?: string
          last_login?: string | null
        }
        Update: {
          id?: string
          telegram_id?: string | null
          username?: string | null
          full_name?: string | null
          email?: string | null
          phone?: string | null
          role?: string
          created_at?: string
          updated_at?: string
          last_login?: string | null
        }
      }
      tracking_history: {
        Row: {
          id: string
          package_id: string
          status: string
          location: string | null
          timestamp: string
          notes: string | null
        }
        Insert: {
          id?: string
          package_id: string
          status: string
          location?: string | null
          timestamp?: string
          notes?: string | null
        }
        Update: {
          id?: string
          package_id?: string
          status?: string
          location?: string | null
          timestamp?: string
          notes?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
