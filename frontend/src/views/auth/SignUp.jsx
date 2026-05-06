import { useState } from "react"
import { useSignUp } from "../../hooks/useAuth"
import { useAuth } from "../../auth/AuthProvider"
import { Navigate } from "react-router-dom"

function SignUp() {
  const [email, setEmail] = useState("")
  const [emailNotValid, setEmailNotValid] = useState(false)
  const [password, setPassword] = useState("")

  const { mutate, isPending, error, data } = useSignUp()
  const { session } = useAuth()

  const isValidUsername = (value) => {
    return /^[a-zA-Z0-9._]+$/.test(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (emailNotValid) setEmailNotValid(false)

    const cleanUsername = email.trim().toLowerCase()

    if (!isValidUsername(cleanUsername)) {
      setEmailNotValid(true)
      return
    }

    mutate({
      email: cleanUsername + '@email.com',
      password
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="username"
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

      {emailNotValid && <p>Email non valida</p>}
      {error && <p>Errore</p>}

      {session && <Navigate to="/" replace />}
    </form>
  )
}

export default SignUp