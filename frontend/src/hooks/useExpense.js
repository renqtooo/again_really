import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createExpense, deleteExpenseById, getExpensesByDate } from '../api/expense'
import { getExpenseTotalStats, } from '../api/expense'

export const useCreateExpense = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => createExpense(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['expense_total_stats']
      })
      queryClient.invalidateQueries({
        queryKey: ['expenses_by_date']
      })
    }
  })
}

export const useGetExpensesByDate = (
  startDate,
  endDate,
  page,
  pageSize
) => {
  return useQuery({
    queryKey: [
      'expenses_by_date',
      startDate,
      endDate,
      page,
      pageSize
    ],

    queryFn: () =>
      getExpensesByDate(
        startDate,
        endDate,
        page,
        pageSize
      ),

    enabled: !!startDate && !!endDate
  })
}

export const useDeleteExpenseById = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id_expense) => deleteExpenseById(id_expense),
    
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['expenses_by_date']
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
