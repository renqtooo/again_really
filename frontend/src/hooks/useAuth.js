import { useMutation } from '@tanstack/react-query'
import { signUp, signIn, logout } from '../api/auth'

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp
  })
}

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: logout
  })
}
