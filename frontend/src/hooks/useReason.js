import { useQuery } from '@tanstack/react-query'
import { getReason } from '../api/reason'

export const useReason = () => {
  return useQuery({
    queryKey: ['reason'],
    queryFn: getReason
  })
}
