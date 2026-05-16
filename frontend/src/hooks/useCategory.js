import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCategory, updateCategory, getCategoryByName, getFavouriteCategories, getCategoryById, deleteCategory, getCategoriesWithUsualPrice, getCategoriesQuickActions } from '../api/category'
import { useAuth } from '../auth/AuthProvider'

export const useCategory = (filteredCategories) => {
  const { session } = useAuth()

  return useQuery({
    queryKey: ['category_all'],
    queryFn: () => getCategory(session.user.id),
    enabled: !filteredCategories
  })
}

export const useGetCategoryByName = () => {
  const { session } = useAuth()

  return useMutation({
    mutationFn: (name) => getCategoryByName(name, session.user.id)
  })
}

export const useGetCategoriesWithUsualPrice = () => {
  const { session } = useAuth()

  return useQuery({
    queryKey: ['category_usual_price'],
    queryFn: () => getCategoriesWithUsualPrice(session.user.id)
  })
}

export const useGetCategoriesQuickActions = () => {
  return useQuery({
    queryKey: ['category_quick_action'],
    queryFn: getCategoriesQuickActions
  })
}

export const useGetCategoryById = (id_category) => {
  return useQuery({
    queryKey: ['category_by_id', id_category],
    queryFn: () => getCategoryById(id_category),
    enabled: !!id_category
  })
}

export const useGetFavouriteCategories = () => {
  const { session } = useAuth()

  return useQuery({
    queryKey: ['favourite_categories'],
    queryFn: () => getFavouriteCategories(session.user.id)
  })
}

export const useUpdateCategory = () => {
  const { session } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => updateCategory(payload, session.user.id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['category_all']
      })

      queryClient.invalidateQueries({
        queryKey: ['favourite_categories']
      })

      queryClient.invalidateQueries({
        queryKey: ['category_by_id']
      })

      queryClient.invalidateQueries({
        queryKey: ['category_usual_price']
      })

      queryClient.invalidateQueries({
        queryKey: ['category_quick_action']
      })
    }
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id_category) => deleteCategory(id_category),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['category_all']
      })

      queryClient.invalidateQueries({
        queryKey: ['favourite_categories']
      })

      queryClient.invalidateQueries({
        queryKey: ['category_by_id']
      })

      queryClient.invalidateQueries({
        queryKey: ['category_usual_price']
      })

      queryClient.invalidateQueries({
        queryKey: ['category_quick_action']
      })
    }
  })
}