import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../auth/AuthProvider'
import { getProfile, updateMonthlyThreshold } from '../api/profile'

export const useProfile = () => {
  const { session } = useAuth()

  return useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(session),
    enabled: !!session
  })
}

export const useUpdateMonthlyThreshold = () => {
  const { session } = useAuth()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (threshold) => updateMonthlyThreshold(threshold, session.user.id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile']
      })
    }
  })
}
