import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCategory, updateCategory, getCategoryByName } from '../api/category'
import { useAuth } from '../auth/AuthProvider'

export const useCategory = () => {
  const { session } = useAuth()

  return useQuery({
    queryKey: ['category'],
    queryFn: () => getCategory(session.user.id)
  })
}

export const useGetCategoryByName = () => {
  const { session } = useAuth()

  return useMutation({
    mutationFn: (name) => getCategoryByName(name, session.user.id)
  })
}

export const useUpdateCategory = () => {
  const { session } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => updateCategory(payload, session.user.id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['category']
      })
    }
  })
}
