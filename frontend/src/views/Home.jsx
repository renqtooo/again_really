import { Button, Container, Flex } from '@mantine/core'
import Header from '../components/Header'
import { IconBasketDollar } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <>
      <Header title={'Home'} />

      <Container style={{ height: '90dvh' }}>
        <Flex justify='center' align='center' direction='column'>
          <Button
            onClick={() => navigate('/expense/create')}
            size='xl'
            leftSection={<IconBasketDollar size={30} />}
            style={{ position: 'fixed', bottom: '15vh' }}
          >
            Nuova Spesa
          </Button>
        </Flex>
      </Container>
    </>
  )
}

export default Home
