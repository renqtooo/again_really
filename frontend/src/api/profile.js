import { supabase } from '../lib/supabase'

export const getProfile = async (session) => {
  const id_profile = session?.user.id
  const { data, error } = await supabase.from('profiles').select('*').eq('id_profile', id_profile).single()

  if (error) throw error

  data.username = session.user.email.split('@')[0]
  return data
}

export const updateSalary = async (salary, id_profile) => {
  const { data, error } = await supabase.from('profiles').update({ salary }).eq('id_profile', id_profile).select()

  if (error) throw error
  return data
}
