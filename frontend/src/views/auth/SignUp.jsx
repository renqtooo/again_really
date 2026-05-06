import { useState } from "react"
import { useSignUp } from "../../hooks/useAuth"
import { useAuth } from "../../auth/AuthProvider"
import { Navigate } from "react-router-dom"

function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { mutate, isPending, error, data } = useSignUp()
  const { session } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()

    mutate({
      email: email.trim().toLowerCase(),
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
        {isPending ? "Creating..." : "Sign up"}
      </button>

      {error && <p>Error</p>}

      {session && <Navigate to="/" replace />}
    </form>
  )
}

export default SignUp