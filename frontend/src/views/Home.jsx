import { Box, Card, Container, Divider, Flex, Group, Loader, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'

import { IconArrowUpRight, IconCalendarDollar, IconCoffee, IconEdit, IconPlus } from '@tabler/icons-react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import HoldButton from '../components/HoldButton'
import { useCreateExpense, useDeleteExpenseById, useExpenseTotalStats, useGetExpensesByDate } from '../hooks/useExpense'
import { useGetCategoriesQuickActions, useGetCategoriesWithUsualPrice, useGetCategoryByName, useUpdateCategory } from '../hooks/useCategory'
import { useEffect, useRef, useState } from 'react'
import { formatCurrency } from '../composables/currency'
import ConfirmDialog from '../components/ConfirmDialog'
import SlotCounter from 'react-slot-counter'
import { usePrevious } from '../hooks/usePrevious'
import CategoryList from '../components/CategoryList'
import { iconMap } from '../composables/category'
import Loading from '../components/Loading'

function Home() {
  const navigate = useNavigate()

  const { data: expenseTotalStats, isLoading: isExpenseTotalStatsLoading } = useExpenseTotalStats()
  const { data: filteredCategories } = useGetCategoriesWithUsualPrice()
  const { mutate: mutateCreateExpense } = useCreateExpense()
  const { mutate: deleteExpense } = useDeleteExpenseById()
  const { data: recentExpenses } = useGetExpensesByDate(new Date().toISOString().split('T')[0], new Date().toISOString().split('T')[0], 1, 500)
  
  const { data: quickActions } = useGetCategoriesQuickActions()
  const { mutate: updateCategory, isPending: isUpdateLoading } = useUpdateCategory()
  const totalAmount = expenseTotalStats?.total_amount
  const previousTotal = usePrevious(totalAmount)
  const mountedRef = useRef(false)

  const shouldAnimate = mountedRef.current && previousTotal != null && previousTotal !== totalAmount
  const [showDialog, setShowDialog] = useState({show: false, add: false, del: false})

  const execQuickAction = (qa) => {
    createExpense(qa)
  }

  const createExpense = (qa) => {
    const payload = {
      id_category: qa.id_category,
      amount: qa?.usual_price
    }

    mutateCreateExpense(payload)
  }

  const addQuickAction = (category) => {
    updateCategory({ ...category, is_quick_action: true })
    setShowDialog({show: false, add: false, del: false})
  }

  const delQuickAction = (category) => {
    updateCategory({ ...category, is_quick_action: false })
    setShowDialog({show: false, add: false, del: false})
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
              onClick={() => navigate("/expense")}
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

                    {!isExpenseTotalStatsLoading && totalAmount != null && (
                      <SlotCounter
                        value={formatCurrency(totalAmount)}
                        separatorCharacters={['.', ',']}
                        autoAnimationStart={shouldAnimate}
                        duration={1.5}
                        dummyCharacters={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                      />
                    )}

                    {isExpenseTotalStatsLoading && <Loader style={{alignSelf: 'center'}} color='#3b82f6' />}
                    {!isExpenseTotalStatsLoading && totalAmount == null && '0.00'}
                  </Title>
                </Box>

                <ThemeIcon size={56} radius='xl' variant='gradient' gradient={{ from: 'blue', to: 'accent' }}>
                  <IconCalendarDollar size={30} />
                </ThemeIcon>
              </Group>

              <SimpleGrid cols={2} mt='xl'>
                <Card radius='xl' p='md' bg='rgba(255,255,255,0.06)'>
                  <Text style={{ textAlign: 'center' }} size='sm' c='gray.4'>
                    Oggi
                  </Text>

                  <Text style={{ textAlign: 'center' }} fw={800} size='xl' c='white'>
                    {'€ ' + formatCurrency(recentExpenses?.data?.reduce((sum, e) => sum + e.amount, 0))}
                  </Text>
                </Card>
                
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
              </SimpleGrid>
            </Paper>

            {/* QUICK ACTIONS */}
            <Stack gap='md'>
              <Group
                onClick={() => {setShowDialog({show: true, add: false, del: true})}}
                ml='md' mb='lg' gap='0'
              >
                {quickActions?.length && <IconEdit /> }
                <Text ml='md' c='white' fw={700} size='lg'>
                  Azioni rapide
                </Text>
              </Group>

              <SimpleGrid cols={2} spacing="lg">
                {quickActions?.map(qa => {
                  const IconComponent = iconMap[qa?.icon]

                  return (
                    <Flex key={qa.id_category} direction='column' align='center' justify='center' gap='sm'>
                      <HoldButton
                        icon={IconComponent ? <IconComponent size={30} /> : null}
                        onComplete={() => execQuickAction(qa)}
                      />
                      <Flex align="center">
                        <Text
                          fw={700}
                          truncate
                          style={{ flex: 1, minWidth: 0 }}
                        >
                          {qa.name}
                        </Text>

                        <Text fw={700} style={{ flexShrink: 0, marginLeft: '3px' }}>
                          € {formatCurrency(qa?.usual_price)}
                        </Text>
                      </Flex>
                    </Flex>
                  )
                })}

                {quickActions?.length < 4 &&
                  <Flex mt='lg' onClick={() => setShowDialog({...showDialog, show: true, add: true})} direction='column' align='center' gap='sm'>
                    <Text onClick={() => {}}>
                      <IconPlus size={30} />
                    </Text>
                    <Text fw={700}>Aggiungi</Text>
                  </Flex>
                }
              </SimpleGrid>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <ConfirmDialog
        opened={showDialog?.show || isUpdateLoading}
        onClose={() => setShowDialog({show: false, add: false, del: false})}
        title={showDialog.add ? 'Aggiungi azione rapida' : showDialog.del ? 'Rimuovi azione rapida' : ''}
      >
        {isUpdateLoading && <Loader style={{alignSelf: 'center'}} color='#3b82f6' />}
        
        {showDialog.add && !isUpdateLoading &&
          <CategoryList
            filteredCategories={filteredCategories?.filter(c => !quickActions?.map(qa => qa.id_category )?.includes(c.id_category))}
            onSelect={(category) => {addQuickAction(category)}}
          />
        }

        {showDialog.del && !isUpdateLoading &&
          <CategoryList
            filteredCategories={quickActions}
            onSelect={(category) => {delQuickAction(category)}}
            delBtn
          />
        }
      </ConfirmDialog>
    </>
  )
}

export default Home
