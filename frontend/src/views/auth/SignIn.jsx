import { useState } from "react"
import { useSignIn } from "../../hooks/useAuth"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../auth/AuthProvider"

function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { mutate, isPending, error, data } = useSignIn()
  const { session } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()

    mutate({
      email: email.trim().toLowerCase() + "@email.com",
      password
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button disabled={isPending}>
        {isPending ? "Creating..." : "Sign in"}
      </button>

      {error && <p>Error</p>}
      
      {session && <Navigate to="/" replace />}
    </form>
  )
}

export default SignIn