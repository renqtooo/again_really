import {
  Box,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  Pagination,
  Button,
  ScrollArea
} from '@mantine/core'

import { useState } from 'react'

import Header from '../components/Header'
import ConfirmDialog from '../components/ConfirmDialog'

import {
  useDeleteExpenseById,
  useGetExpensesByDate
} from '../hooks/useExpense'

import { formatCurrency } from '../composables/currency'

function Expenses() {
  const [page, setPage] = useState(1)
  const [showExpenseDialog, setShowExpenseDialog] = useState(null)

  const months = [
    {
      name: 'Ultimi 30 giorni',
      dates: [
        new Date(new Date().setDate(new Date().getDate() - 30))
          .toISOString()
          .split('T')[0],
        new Date().toISOString().split('T')[0]
      ]
    }
  ]

  const now = new Date()
  for (let i = 0; i < 6; i++) {
    const start = new Date(
      now.getFullYear(),
      now.getMonth() - i,
      1
    )

    const end = new Date(
      now.getFullYear(),
      now.getMonth() - i + 1,
      0
    )

    months.push({
      name: start
        .toLocaleString('it-IT', {
          month: 'long',
          year: 'numeric'
        })
        .replace(/^./, c => c.toUpperCase()),

      dates: [
        start.toISOString().split('T')[0],
        end.toISOString().split('T')[0]
      ]
    })
  }

  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0)
  const selectedMonth = months[selectedMonthIndex]

  const { data: expenses } = useGetExpensesByDate(selectedMonth.dates[0], selectedMonth.dates[1], page, 5)

  const { mutate: deleteExpense } = useDeleteExpenseById()

  const handleDeleteExpense = (expense) => {
    deleteExpense(expense.id_expense)
    setShowExpenseDialog(null)
  }

  return (
    <>
      <Box
        style={{
          minHeight: '100dvh',
          background:
            'linear-gradient(180deg, #0f172a 0%, #111827 90%, #040a24 100%)'
        }}
      >
        <Header title='Spese' />

        <Container
          size='sm'
          style={{ paddingBottom: '15rem' }}
        >
          <Paper
            radius='32px'
            p='md'
            mb='md'
            style={{
              background:
                'linear-gradient(135deg, #ffffff24, rgba(255,255,255,0.05))',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(20px)',
              color: 'white'
            }}
          >
            <Title order={2}>
              {selectedMonth.name}
            </Title>

          </Paper>
            
            <Text mt='md' mb='xs'>Ultimi 6 mesi</Text>
            <ScrollArea pb='xs'>
              <Group wrap='nowrap' gap='xs'>
                {months.map((month, index) => (
                  <Button
                    key={month.name}
                    radius='xl'
                    size='md'
                    variant={
                      selectedMonthIndex === index
                        ? 'filled'
                        : 'light'
                    }
                    color='blue'
                    style={{ flexShrink: 0 }}
                    onClick={() => {
                      setSelectedMonthIndex(index)
                      setPage(1)
                    }}
                  >
                    {month.name}
                  </Button>
                ))}
              </Group>
            </ScrollArea>

          <Text my='xs' ta='center' c='dimmed'>
            {expenses?.data?.length === 0
              ? 'Nessuna spesa'
              : `${
                  expenses?.pagination?.total ??
                  'Caricamento'
                } spese totali ( €${formatCurrency(
                  expenses?.totalAmount
                )} )`}
          </Text>

          <Stack gap='sm'>
            {expenses?.data?.map((e) => (
              <Paper
                key={e.id_expense}
                radius='xl'
                p='md'
                bg='rgba(255,255,255,0.04)'
                onClick={() => setShowExpenseDialog(e)}
                style={{
                  cursor: 'pointer'
                }}
              >
                <Group justify='space-between'>
                  <Box>
                    <Text c='white' fw={700}>
                      {e.category.name}
                    </Text>

                    <Text size='sm' c='dimmed'>
                      {new Date(
                        e.created_at
                      ).toLocaleString('it-IT', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Text>
                  </Box>

                  <Text
                    fw={800}
                    size='lg'
                    c='red.4'
                  >
                    - € {formatCurrency(e.amount)}
                  </Text>
                </Group>
              </Paper>
            ))}
          </Stack>

          {expenses?.pagination?.totalPages > 1 && (
            <Group
              justify='center'
              style={{
                position: 'fixed',
                bottom: 130,
                left: 0,
                right: 0,
                zIndex: 1000,
                pointerEvents: 'none'
              }}
            >
              <Paper
                p={8}
                radius='100px'
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))',
                  border:
                    '1px solid rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(22px)',
                  boxShadow:
                    '0 20px 50px rgba(0,0,0,0.35)',
                  pointerEvents: 'auto'
                }}
              >
                <Pagination
                  value={page}
                  onChange={setPage}
                  total={expenses.pagination.totalPages}
                  radius='xl'
                  size='lg'
                  siblings={0}
                  boundaries={1}
                  color='blue.8'
                  styles={{
                    control: {
                      minWidth: 42,
                      height: 42,
                      transition: 'all .3s ease'
                    }
                  }}
                />
              </Paper>
            </Group>
          )}
        </Container>
      </Box>

      <ConfirmDialog
        opened={!!showExpenseDialog}
        onClose={() => setShowExpenseDialog(null)}
        onConfirm={() =>
          handleDeleteExpense(showExpenseDialog)
        }
        title='Eliminazione spesa'
        confirmText='Elimina'
        message={
          '€ ' +
          formatCurrency(
            showExpenseDialog?.amount || 0
          ) +
          ' ' +
          showExpenseDialog?.category?.name
        }
      />
    </>
  )
}

export default Expenses