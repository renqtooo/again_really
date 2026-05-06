import { Button, Container, Flex, Text, Title } from '@mantine/core'
import { useProfile } from '../hooks/useProfile'
import Loading from '../components/Loading'
import { useLogout } from '../hooks/useAuth'
import Header from '../components/Header'

export default function Profile() {
  const { data, isLoading } = useProfile()

  const { mutate } = useLogout()

  return (
    <>
      <Header title={'Profilo'} />
      {isLoading && <Loading />}

      {!isLoading && (
        <Container style={{ height: '90dvh' }}>
          <Flex justify='center' align='center' direction='column'>
            <Title>{data.username}</Title>
            {data.salary && <Text>Stipendio: {data.salary}</Text>}

            <Button onClick={() => mutate()} style={{ position: 'fixed', bottom: '15vh' }} color='error'>
              Logout
            </Button>
          </Flex>
        </Container>
      )}
    </>
  )
}
