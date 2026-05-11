import { supabase } from '../lib/supabase'

export const createExpense = async (payload) => {
  const { data, error } = await supabase
    .from('expenses')
    .insert([payload])
    .select()

  if (error) throw error
  return data
}

// *** STATS ***


export const getExpenseTotalStats = async (id_user) => {
  const { data, error } = await supabase
    .from('total_expenses_stats')
    .select('*')
    .eq('id_profile', id_user)
    .maybeSingle()

  if (error) throw error
  return data
}