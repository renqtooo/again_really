import { useMutation } from '@tanstack/react-query'
import { signUp, signIn } from '../api/auth'

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  })
}

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
  })
}