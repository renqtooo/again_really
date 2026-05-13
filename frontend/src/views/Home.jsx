import { Box, Card, Container, Flex, Group, Loader, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'

import { IconArrowUpRight, IconCoffee, IconPlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import HoldButton from '../components/HoldButton'
import { useCreateExpense, useDeleteExpenseById, useExpenseTotalStats, useRecentExpenses } from '../hooks/useExpense'
import { useGetCategoryByName } from '../hooks/useCategory'
import { useEffect, useRef, useState } from 'react'
import { formatCurrency } from '../composables/currency'
import ConfirmDialog from '../components/ConfirmDialog'
import SlotCounter from 'react-slot-counter'
import { usePrevious } from '../hooks/usePrevious'

function Home() {
  const navigate = useNavigate()

  const { data: expenseTotalStats } = useExpenseTotalStats()
  const { mutate: getCategoryByName, data: coffee } = useGetCategoryByName()
  const { mutate: mutateCreateExpense } = useCreateExpense()
  const { data: recentExpenses } = useRecentExpenses()
  const { mutate: deleteExpense } = useDeleteExpenseById()

  const [showExpenseDialog, setShowExpenseDialog] = useState(false)
  const totalAmount = expenseTotalStats?.total_amount
  const previousTotal = usePrevious(totalAmount)
  const mountedRef = useRef(false)

  const shouldAnimate = mountedRef.current && previousTotal != null && previousTotal !== totalAmount

  useEffect(() => {
    mountedRef.current = true
    getCategoryByName('Caffè')
  }, [])

  const quickCoffee = () => {
    createExpense(coffee)
  }

  const createExpense = (category) => {
    const payload = {
      id_category: category?.id_category,
      amount: category?.usual_price
    }

    mutateCreateExpense(payload)
  }

  const handleDeleteExpense = (expense) => {
    deleteExpense(expense.id_expense)
    setShowExpenseDialog(false)
  }

  return (
    <>
      <Box
        style={{
          minHeight: '100dvh',
          background: 'linear-gradient(180deg, #0f172a 0%, #111827 45%, #020617 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Header title={'Again? Really?'} />

        {/* background blur circles */}
        <Box
          style={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: '#3b82f6',
            filter: 'blur(120px)',
            top: -80,
            right: -80,
            opacity: 0.4
          }}
        />

        <Box
          style={{
            position: 'absolute',
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: '#8b5cf6',
            filter: 'blur(120px)',
            bottom: 100,
            left: -80,
            opacity: 0.35
          }}
        />

        <Container size='sm' pb={140} style={{ position: 'relative', zIndex: 2 }}>
          <Stack gap='xl'>
            {/* HERO */}
            <Paper
              radius='32px'
              p='xl'
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.05))',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(20px)',
                color: 'white'
              }}
            >
              <Group justify='space-between' align='flex-start'>
                <Box>
                  <Text c='gray.3' fw={500}>
                    Spese Totali
                  </Text>

                  <Title
                    order={1}
                    fw={900}
                    style={{
                      fontSize: 52,
                      lineHeight: 1,
                      display: 'flex',
                      alignItems: 'end',
                      gap: 8
                    }}
                  >
                    <span>€</span>

                    {totalAmount != null && (
                      <SlotCounter
                        value={formatCurrency(totalAmount)}
                        separatorCharacters={['.', ',']}
                        autoAnimationStart={shouldAnimate}
                        duration={1.5}
                        dummyCharacters={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                      />
                    )}

                    {totalAmount == null && <Loader style={{alignSelf: 'center'}} color='#3b82f6' />}
                  </Title>
                </Box>

                <ThemeIcon size={56} radius='xl' variant='gradient' gradient={{ from: 'blue', to: 'accent' }}>
                  <IconArrowUpRight size={30} />
                </ThemeIcon>
              </Group>

              <SimpleGrid cols={2} mt='xl'>
                <Card
                  radius='xl'
                  p='md'
                  bg='rgba(255,255,255,0.06)'
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Text style={{ textAlign: 'center' }} size='sm' c='gray.4'>
                    Questo mese
                  </Text>

                  <Text style={{ textAlign: 'center' }} fw={800} size='xl' c='white'>
                    {'€ ' + formatCurrency(expenseTotalStats?.last_month_total)}
                  </Text>
                </Card>

                <Card radius='xl' p='md' bg='rgba(255,255,255,0.06)'>
                  <Text style={{ textAlign: 'center' }} size='sm' c='gray.4'>
                    Media giornaliera
                  </Text>

                  <Text style={{ textAlign: 'center' }} fw={800} size='xl' c='white'>
                    {'€ ' + formatCurrency(expenseTotalStats?.daily_avg_last_month)}
                  </Text>
                </Card>
              </SimpleGrid>
            </Paper>

            {/* QUICK ACTIONS */}
            <Stack gap='md'>
              <Text ml='md' c='white' fw={700} size='lg'>
                Azioni veloci
              </Text>

              <Group grow>
                <Flex direction='column' align='center' justify='center' gap='sm'>
                  <HoldButton icon={<IconCoffee size={34} />} onComplete={quickCoffee} />

                  <Text fw={700}>Caffè € {formatCurrency(coffee?.usual_price)}</Text>
                </Flex>

                <Flex direction='column' align='center' gap='sm'>
                  <Text onClick={() => navigate('/expense/create')}>
                    <IconPlus size={34} />
                  </Text>
                  <Text fw={700}>Nuova spesa</Text>
                </Flex>
              </Group>
            </Stack>

            {/* RECENTI */}
            <Card
              radius='32px'
              py='xl'
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(18px)',
                border: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <Title style={{ textAlign: 'center' }} mb='lg' order={3} c='white'>
                Recenti
              </Title>
              {recentExpenses?.length === 0 && (
                <Text style={{ textAlign: 'center' }} c='dimmed'>
                  Nessuna spesa recente
                </Text>
              )}
              <Stack gap='sm'>
                {recentExpenses?.map((e) => (
                  <Paper
                    onClick={() => setShowExpenseDialog(e)}
                    key={e.id_expense}
                    radius='xl'
                    p='md'
                    bg='rgba(255,255,255,0.04)'
                  >
                    <Group mx='xs' justify='space-between'>
                      <Group>
                        <Box>
                          <Text c='white' fw={700}>
                            {e.category.name}
                          </Text>

                          <Text size='sm' c='dimmed'>
                            {new Date(e.created_at).toLocaleString('it-IT', {
                              day: '2-digit',
                              month: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </Text>
                        </Box>
                      </Group>

                      <Text fw={800} size='lg' c='red.4'>
                        - € {formatCurrency(e.amount)}
                      </Text>
                    </Group>
                  </Paper>
                ))}
              </Stack>
            </Card>
          </Stack>
        </Container>
      </Box>

      <ConfirmDialog
        opened={showExpenseDialog}
        onClose={() => setShowExpenseDialog(false)}
        onConfirm={() => handleDeleteExpense(showExpenseDialog)}
        title='Eliminazione spesa'
        confirmText='Elimina'
        message={
          '€ ' +
          formatCurrency(showExpenseDialog?.amount) +
          ' ' +
          showExpenseDialog?.category?.name +
          ' - ' +
          new Date(showExpenseDialog?.created_at).toLocaleString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      />
    </>
  )
}

export default Home
