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
      projects: {
        Row: {
          id: string
          slug: string
          title: string
          description: string
          content: string | null
          tech_stack: string[]
          image_url: string | null
          live_url: string | null
          github_url: string | null
          featured: boolean
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description: string
          content?: string | null
          tech_stack?: string[]
          image_url?: string | null
          live_url?: string | null
          github_url?: string | null
          featured?: boolean
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string
          content?: string | null
          tech_stack?: string[]
          image_url?: string | null
          live_url?: string | null
          github_url?: string | null
          featured?: boolean
          order_index?: number
          created_at?: string
        }
        Relationships: []
      }
      experiences: {
        Row: {
          id: string
          role: string
          company: string
          start_date: string
          end_date: string | null
          current: boolean
          description: string | null
          skills: string[]
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          role: string
          company: string
          start_date: string
          end_date?: string | null
          current?: boolean
          description?: string | null
          skills?: string[]
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          role?: string
          company?: string
          start_date?: string
          end_date?: string | null
          current?: boolean
          description?: string | null
          skills?: string[]
          order_index?: number
          created_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          status: 'unread' | 'read' | 'replied'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          status?: 'unread' | 'read' | 'replied'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          status?: 'unread' | 'read' | 'replied'
          created_at?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
