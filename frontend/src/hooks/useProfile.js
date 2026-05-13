import { useMutation, useQuery } from '@tanstack/react-query'
import { useAuth } from '../auth/AuthProvider'
import { getProfile, updateSalary } from '../api/profile'

export const useProfile = () => {
  const { session } = useAuth()

  return useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(session),
    enabled: !!session
  })
}

export const useUpdateSalary = () => {
  const { session } = useAuth()
  
  return useMutation({
    mutationFn: (salary) => updateSalary(salary, session.user.id)
  })
}
