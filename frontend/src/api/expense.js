import { supabase } from '../lib/supabase'

export const createExpense = async (payload) => {
  const { data, error } = await supabase.from('expenses').insert([payload]).select()

  if (error) throw error
  return data
}

export const getRecentExpenses = async () => {
  const { data: recentExpenses, error } = await supabase
    .from('expenses')
    .select('*')
    .limit(5)
    .order('created_at', { ascending: false })
  if (error) throw error

  const categoryIds = [...new Set(recentExpenses.map((expense) => expense.id_category))]

  const { data: categories, error: errorCategories } = await supabase
    .from('categories')
    .select('*')
    .in('id_category', categoryIds)
  if (errorCategories) throw errorCategories

  const data = recentExpenses.map((expense) => ({
    ...expense,
    category: categories.find((category) => category.id_category === expense.id_category)
  }))

  return data
}

// *** STATS ***

export const getExpenseTotalStats = async () => {
  const { data, error } = await supabase.from('total_expenses_stats').select('*').maybeSingle()

  if (error) throw error
  return data
}
