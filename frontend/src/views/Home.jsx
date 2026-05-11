import { Button, Container, Flex, Grid, Stack, Title } from '@mantine/core'
import Header from '../components/Header'
import { IconBasketDollar, IconCoffee, IconPlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useCreateExpense, useExpenseTotalStats } from '../hooks/useExpense'
import HoldButton from '../components/HoldButton'
import ConfirmDialog from '../components/ConfirmDialog'
import { useEffect, useState } from 'react'
import { useGetCategoryByName } from '../hooks/useCategory'
import { formatCurrency } from '../composables/currency'

function Home() {
  const navigate = useNavigate()

  const { data: expenseTotalStats } = useExpenseTotalStats()
  const { mutate: getCategoryByName, data: coffee } = useGetCategoryByName()
  const { mutate: mutateCreateExpense } = useCreateExpense()

  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    getCategoryByName('Caffè')
  }, [])

  const [dialog, setDialog] = useState({ title: '', message: '', isVisible: false })

  const quickCoffee = () => {
    setSelectedCategory(coffee)
    setDialog({ title: 'Caffè ' + formatCurrency(coffee?.usual_price) + '€?', isVisible: true })
  }

  const createExpense = () => {
    const payload = {
      id_category: selectedCategory?.id_category,
      amount: selectedCategory?.usual_price
    }

    mutateCreateExpense(payload)

    setSelectedCategory(null)
    setDialog({ title: '', message: '', isVisible: false })
  }

  return (
    <>
      <Header title={'Again? Really?'} />

      <Container style={{ height: '90dvh' }}>
        <div style={{ paddingTop: '6rem' }}></div>

        <Title size={50} style={{ textAlign: 'center' }}>
          {expenseTotalStats?.total_amount ? '€ ' + formatCurrency(expenseTotalStats?.total_amount) : '€ 0.00'}
        </Title>

        <div style={{ paddingTop: '3rem' }}></div>

        <Grid mt='xl' justify='center' gap='lg'>
          <HoldButton icon={<IconCoffee size={40} />} onComplete={quickCoffee} />

          <HoldButton
            holdTime={0}
            icon={<IconPlus size={40} />}
            onComplete={() => {
              console.log('aggiungi quick action')
            }}
          />
        </Grid>

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

      <ConfirmDialog
        opened={dialog.isVisible}
        title={dialog.title}
        onClose={() => setDialog({ isVisible: false })}
        onConfirm={createExpense}
      />
    </>
  )
}

export default Home
