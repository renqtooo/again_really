import { supabase } from '../lib/supabase'

export const getReason = async () => {
  const { data, error } = await supabase.from('reasons').select('*')

  if (error) throw error
  return data
}
