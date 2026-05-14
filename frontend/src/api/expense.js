import { supabase } from '../lib/supabase'

export const createExpense = async (payload) => {
  const { data, error } = await supabase.from('expenses').insert([payload]).select()

  if (error) throw error
  return data
}

export const getExpensesByDate = async (
    startDate,
    endDate,
    page = 1,
    pageSize = 5
) => {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error, count } = await supabase
    .from('expenses')
    .select(
      `
      *,
      category:categories(*)
    `,
      { count: 'exact' }
    )
    .gte('created_at', `${startDate}T00:00:00`)
    .lte('created_at', `${endDate}T23:59:59`)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) throw error

  return {
    data,
    pagination: {
      page,
      pageSize,
      total: count,
      totalPages: Math.ceil((count || 0) / pageSize)
    }
  }
}

export const deleteExpenseById = async (id_expense) => {
  const { data, error } = await supabase
    .from('expenses')
    .delete()
    .eq('id_expense', id_expense)

    if (error) throw error
    return data
}

// *** STATS ***

export const getExpenseTotalStats = async () => {
  const { data, error } = await supabase.from('total_expenses_stats').select('*').maybeSingle()

  if (error) throw error
  return data
}
