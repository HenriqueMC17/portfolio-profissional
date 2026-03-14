import { createClient } from '@/utils/supabase/server'

export async function getLeads() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching leads:', error)
    return { data: null, error }
  }

  return { data, error: null }
}

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) {
    console.error('Error fetching user:', error)
    return { user: null, error }
  }

  return { user, error: null }
}
