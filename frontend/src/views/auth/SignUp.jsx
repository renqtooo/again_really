import { useEffect, useState } from "react"
import { useSignUp } from "../../hooks/useAuth"
import { useAuth } from "../../auth/AuthProvider"
import { Link, Navigate } from "react-router-dom"
import { Alert, Button, Container, Flex, Paper, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons-react"

function SignUp() {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState(null)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(null)
  
  const { mutate, isPending, error, data } = useSignUp()
  const { session } = useAuth()
  
  if (session) {
    return <Navigate to="/" replace />
  }

  useEffect(() => {
    if (!email) {
      setEmailError(null)
      return
    }

    let timeout

    if (!/^[a-zA-Z0-9._]+$/.test(email)) {
      setEmailError("Solo lettere, numeri, punti e underscore")
    } else if (email.length < 3) {
      timeout = setTimeout(() => {
        setEmailError("Minimo 3 caratteri")
      }, 400)
    } else {
      setEmailError(null)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [email])

  useEffect(() => {
    if (!password) {
      setPasswordError(null)
      return
    }
    let timeout
    if (password.length < 6) {
      timeout = setTimeout(() => {
        setPasswordError("Minimo 6 caratteri")
      }, 600)
    } else {
      setPasswordError(null)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [password])
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const cleanUsername = email.trim().toLowerCase()

    if (cleanUsername.length < 3 || emailError || password < 6) return

    mutate({
      email: cleanUsername + '@email.com',
      password
    })
  }

  return (
    <Flex direction="column" justify="center" mx="lg" style={{height: '100vh' }}>
      <Title ta="center" mb="md">
        Crea account
      </Title>

      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Username"
            placeholder="mario_rossi"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value.trim().toLowerCase())}
            error={
                (error?.code === 'user_already_exists' && email && !emailError)
                  ? "Username già in uso"
                  : (emailError && email)
                  ? emailError
                  : ''
              }
          />

          <PasswordInput
            label="Password"
            placeholder="************"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value.trim())}
            error={passwordError}
          />

          <Button type="submit" loading={isPending} disabled={!email || !password || emailError || email.length<3 || password.length<6} fullWidth>
            Registrati
          </Button>

          <Text>Sei già registrato? <Link to="/signin">Login</Link></Text>

          {(error && error?.code !== 'user_already_exists') && (
            <Alert icon={<IconAlertCircle size={16} />} color="red">
              Errore durante la registrazione
            </Alert>
          )}
        </Stack>
      </form>
    </Flex>
  )
}

export default SignUp