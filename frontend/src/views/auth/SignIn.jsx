import { useEffect, useState } from "react"
import { useSignIn } from "../../hooks/useAuth"
import { useAuth } from "../../auth/AuthProvider"
import { Link, Navigate } from "react-router-dom"
import { Alert, Button, Container, Flex, Paper, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons-react"

function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const { mutate, isPending, error, data } = useSignIn()
  const { session } = useAuth()
  
  if (session) {
    return <Navigate to="/" replace />
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const cleanUsername = email.trim().toLowerCase()

    if (cleanUsername.length < 3 || password < 6) return

    mutate({
      email: cleanUsername + '@email.com',
      password
    })
  }

  return (
    <Flex direction="column" justify="center" mx="lg" style={{height: '100vh' }}>
      <Title ta="center" mb="md">
        Login
      </Title>

      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Username"
            placeholder="mario_rossi"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value.trim().toLowerCase())}
          />

          <PasswordInput
            label="Password"
            placeholder="************"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value.trim())}
          />

          <Button type="submit" loading={isPending} disabled={!email || !password || email.length<3 || password.length<6} fullWidth>
            Entra
          </Button>

          <Text>Non hai ancora un account? <Link to="/signup">Registrati</Link></Text>

          {error && (
            <Alert icon={<IconAlertCircle size={16} />} color="red">
              Errore durante il login
            </Alert>
          )}
        </Stack>
      </form>
    </Flex>
  )
}

export default SignIn