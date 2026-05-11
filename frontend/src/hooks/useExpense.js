import { useMutation, useQuery } from '@tanstack/react-query'
import { createExpense } from '../api/expense'
import { getExpenseTotalStats } from '../api/expense'
import { useAuth } from '../auth/AuthProvider'

export const useCreateExpense = () => {
  return useMutation({
    mutationFn: (payload) => createExpense(payload),
  })
}

// *** STATS ***

export const useExpenseTotalStats = () => {
  const { session } = useAuth()

  return useQuery({
    queryKey: ['expense_total_stats'],
    queryFn: () => getExpenseTotalStats(session.user.id)
  })
}
