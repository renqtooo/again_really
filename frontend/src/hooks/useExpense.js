import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createExpense, deleteExpenseById } from '../api/expense'
import { getExpenseTotalStats, getRecentExpenses } from '../api/expense'

export const useCreateExpense = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => createExpense(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['expense_total_stats']
      })
      queryClient.invalidateQueries({
        queryKey: ['recent_expenses']
      })
    }
  })
}

export const useRecentExpenses = () => {
  return useQuery({
    queryKey: ['recent_expenses'],
    queryFn: getRecentExpenses
  })
}

export const useDeleteExpenseById = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id_expense) => deleteExpenseById(id_expense),
    
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['recent_expenses']
      })

      queryClient.invalidateQueries({
        queryKey: ['expense_total_stats']
      })
    }
  })
}

// *** STATS ***

export const useExpenseTotalStats = () => {
  return useQuery({
    queryKey: ['expense_total_stats'],
    queryFn: getExpenseTotalStats
  })
}
