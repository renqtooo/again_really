import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title
} from '@mantine/core'

import {
  IconAlertTriangle,
  IconCash,
  IconChartBar,
  IconCreditCard,
  IconLogout2,
  IconReceipt2,
  IconShieldCheckFilled,
  IconTrendingDown,
  IconTrendingUp
} from '@tabler/icons-react'

import { useProfile, useUpdateMonthlyThreshold } from '../hooks/useProfile'
import Loading from '../components/Loading'
import { useLogout } from '../hooks/useAuth'
import Header from '../components/Header'
import { useExpenseTotalStats } from '../hooks/useExpense'
import { useEffect, useState } from 'react'
import ConfirmDialog from '../components/ConfirmDialog'
import { formatCurrency } from '../composables/currency'

export default function Profile() {
  const { data: profileData, isLoading: isProfileLoading } = useProfile()

  const { data: expenseTotalStats, isLoading: isExpenseTotalStatsLoading } = useExpenseTotalStats()

  const { mutate: logout } = useLogout()
  const { mutate: updateMonthlyThreshold } = useUpdateMonthlyThreshold()

  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showThresholdDialog, setShowThresholdDialog] = useState(false)

  const [threshold, setThreshold] = useState(null)
  const [tempThreshold, setTempThreshold] = useState(0)

  useEffect(() => {
    if (profileData?.monthly_threshold != null) {
      setThreshold(profileData.monthly_threshold)
    }
  }, [profileData])

  const openThresholdDialog = () => {
    setTempThreshold(threshold ?? 0)
    setShowThresholdDialog(true)
  }

  if (isProfileLoading) {
    return <Loading />
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
        <Header title='Profilo' />

        {/* BACKGROUND BLURS */}
        <Box
          style={{
            position: 'absolute',
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: '#3b82f6',
            filter: 'blur(120px)',
            top: -120,
            right: -100,
            opacity: 0.35
          }}
        />

        <Box
          style={{
            position: 'absolute',
            width: 260,
            height: 260,
            borderRadius: '50%',
            background: '#8b5cf6',
            filter: 'blur(120px)',
            bottom: 80,
            left: -80,
            opacity: 0.3
          }}
        />

        <Container
          size='sm'
          pb={140}
          style={{
            position: 'relative',
            zIndex: 2
          }}
        >
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
                  <Title
                    order={1}
                    fw={900}
                    style={{
                      fontSize: 42,
                      lineHeight: 1
                    }}
                  >
                    {profileData?.username}
                  </Title>

                  <Text
                    mt='lg'
                    onClick={openThresholdDialog}
                    style={{
                      cursor: 'pointer'
                    }}
                  >
                    <Text span c='gray.4'>
                      Soglia spesa mensile:{' '}
                    </Text>

                    <Text span fw={800} c='white'>
                      {threshold != null ? `€ ${formatCurrency(threshold)}` : '(imposta)'}
                    </Text>
                  </Text>
                </Box>
              </Group>
            </Paper>

            {/* STATS */}
            <Card
              radius='32px'
              py='xl'
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(18px)',
                border: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <Group px='sm' justify='space-between' mb='lg'>
                <Group>
                  <ThemeIcon radius='xl' size={48} variant='gradient' gradient={{ from: 'violet', to: 'grape' }}>
                    <IconChartBar size={24} />
                  </ThemeIcon>

                  <Title order={3} c='white'>
                    Statistiche
                  </Title>
                </Group>
              </Group>

              <Divider mb='xl' color='rgba(255,255,255,0.08)' />

              {isExpenseTotalStatsLoading ? (
                <Flex justify='center' py='xl'>
                  <Loader color='blue' />
                </Flex>
              ) : (
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
                  <Card radius='xl' p='lg' bg='rgba(255,255,255,0.04)'>
                    <Group justify='space-between'>
                      <Box>
                        <Text size='sm' c='gray.4'>
                          Totale acquisti
                        </Text>

                        <Text fw={900} size='xl' c='white'>
                          {expenseTotalStats?.total_expenses_count ?? 0}
                        </Text>
                      </Box>

                      <ThemeIcon size={50} radius='xl' variant='light' color='blue'>
                        <IconReceipt2 size={24} />
                      </ThemeIcon>
                    </Group>
                  </Card>

                  <Card radius='xl' p='lg' bg='rgba(255,255,255,0.04)'>
                    <Group justify='space-between'>
                      <Box>
                        <Text size='sm' c='gray.4'>
                          Totale spese
                        </Text>

                        <Text fw={900} size='xl' c='white'>
                          € {formatCurrency(expenseTotalStats?.total_amount)}
                        </Text>
                      </Box>

                      <ThemeIcon size={50} radius='xl' variant='light' color='cyan'>
                        <IconCash size={24} />
                      </ThemeIcon>
                    </Group>
                  </Card>

                  <Card radius='xl' p='lg' bg='rgba(255,255,255,0.04)'>
                    <Group justify='space-between'>
                      <Box>
                        <Text size='sm' c='gray.4'>
                          Media giornaliera (questo mese)
                        </Text>

                        <Text fw={900} size='xl' c='white'>
                          € {formatCurrency(expenseTotalStats?.daily_avg_current_month)}
                        </Text>
                      </Box>

                      <ThemeIcon size={50} radius='xl' variant='light' color='grape'>
                        <IconCreditCard size={24} />
                      </ThemeIcon>
                    </Group>
                  </Card>

                  <Card radius='xl' p='lg' bg='rgba(255,255,255,0.04)'>
                    <Group justify='space-between'>
                      <Box>
                        <Text size='sm' c='gray.4'>
                          Spesa massima in un giorno
                        </Text>

                        <Text fw={900} size='xl' c='red.4'>
                          € {formatCurrency(expenseTotalStats?.max_daily_total)}
                        </Text>
                      </Box>

                      <ThemeIcon size={50} radius='xl' variant='light' color='red'>
                        <IconAlertTriangle size={24} />
                      </ThemeIcon>
                    </Group>
                  </Card>

                  <Card radius='xl' p='lg' bg='rgba(255,255,255,0.04)'>
                    <Group justify='space-between'>
                      <Box>
                        <Text size='sm' c='gray.4'>
                          Spesa minima in un giorno
                        </Text>

                        <Text fw={900} size='xl' c='teal.3'>
                          € {formatCurrency(expenseTotalStats?.min_daily_total)}
                        </Text>
                      </Box>

                      <ThemeIcon size={50} radius='xl' variant='light' color='teal'>
                        <IconShieldCheckFilled size={24} />
                      </ThemeIcon>
                    </Group>
                  </Card>

                  <Card radius='xl' p='lg' bg='rgba(255,255,255,0.04)'>
                    <Group justify='space-between'>
                      <Box>
                        <Text size='sm' c='gray.4'>
                          Spesa singola massima di sempre
                        </Text>

                        <Text fw={900} size='xl' c='red.4'>
                          € {formatCurrency(expenseTotalStats?.max_amount)}
                        </Text>
                      </Box>

                      <ThemeIcon size={50} radius='xl' variant='light' color='red'>
                        <IconTrendingUp size={24} />
                      </ThemeIcon>
                    </Group>
                  </Card>

                  <Card radius='xl' p='lg' bg='rgba(255,255,255,0.04)'>
                    <Group justify='space-between'>
                      <Box>
                        <Text size='sm' c='gray.4'>
                          Spesa singola minima di sempre
                        </Text>

                        <Text fw={900} size='xl' c='teal.3'>
                          € {formatCurrency(expenseTotalStats?.min_amount)}
                        </Text>
                      </Box>

                      <ThemeIcon size={50} radius='xl' variant='light' color='teal'>
                        <IconTrendingDown size={24} />
                      </ThemeIcon>
                    </Group>
                  </Card>
                </SimpleGrid>
              )}
            </Card>

            <Button
              leftSection={<IconLogout2 size={30} />}
              onClick={() => setShowConfirmDialog(true)}
              radius='xl'
              variant='light'
              color='red'
              size='lg'
            >
              Logout
            </Button>
          </Stack>
        </Container>
      </Box>

      <ConfirmDialog
        opened={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={() => logout()}
        title='Sei sicuro di voler uscire?'
      />

      <ConfirmDialog
        opened={showThresholdDialog}
        onClose={() => {
          setTempThreshold(0)
          setShowThresholdDialog(false)
        }}
        onConfirm={() => {
          setThreshold(tempThreshold > 0 ? Number(tempThreshold) : null)

          updateMonthlyThreshold(tempThreshold > 0 ? Number(tempThreshold) : null)

          setShowThresholdDialog(false)
        }}
        title='Soglia spesa mensile'
        input
        value={tempThreshold}
        onChange={(val) => setTempThreshold(Number(val) >= 0 ? Number(val) : 0)}
        min={0}
      />
    </>
  )
}
