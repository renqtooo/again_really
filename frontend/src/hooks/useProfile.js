import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../auth/AuthProvider'
import { getProfile } from '../api/profile'

export const useProfile = () => {
  const { session } = useAuth()

  return useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(session),
    enabled: !!session
  })
}
