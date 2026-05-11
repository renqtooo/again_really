import {
  Button,
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
  Title,
} from '@mantine/core'

import {
  IconCash,
  IconChartBar,
  IconCreditCard,
  IconLogout2,
  IconReceipt2,
  IconTrendingDown,
  IconTrendingUp,
} from '@tabler/icons-react'

import { useProfile, useUpdateSalary } from '../hooks/useProfile'
import Loading from '../components/Loading'
import { useLogout } from '../hooks/useAuth'
import Header from '../components/Header'
import { useExpenseTotalStats } from '../hooks/useExpense'
import StatCard from "../components/StatCard"
import { useEffect, useState } from 'react'
import ConfirmDialog from "../components/ConfirmDialog"

export default function Profile() {
  const { data: profileData, isLoading: isProfileLoading } = useProfile()

  const {
    data: expenseTotalStats,
    isLoading: isExpenseTotalStatsLoading,
  } = useExpenseTotalStats()

  const { mutate: logout } = useLogout()
  const { mutate: updateSalary } = useUpdateSalary()

  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showSalaryDialog, setShowSalaryDialog] = useState(false)
  const [salary, setSalary] = useState(null)
  const [tempSalary, setTempSalary] = useState(0)
  
  const openSalaryDialog = () => {
    setTempSalary(salary ?? 0)
    setShowSalaryDialog(true)
  }

  useEffect(() => {
    if (profileData?.salary != null) setSalary(profileData.salary) 
  }, [profileData])


  if (isProfileLoading) {
    return <Loading />
  }

  return (
    <>
      <Header title="Profilo" />
      
      <Container size="md" py="xl" pb={120}>
        <Stack gap="xl">
          {/* HERO */}
          <Paper
            radius="2xl"
            p="xl"
            withBorder
            shadow="md"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,140,0,0.08), rgba(255,200,120,0.08))',
            }}
          >
            <div>
              <Group justify='space-between' align='center'>
                <Title order={2}>{profileData?.username}</Title>
                <Button
                  size='xs'
                  color='error'
                  onClick={() => setShowConfirmDialog(true)}
                ><IconLogout2 /></Button>
              </Group>

              <Text onClick={openSalaryDialog} mt="md" c="dimmed" size="lg">
                Stipendio:{' '}
                <Text span fw={700} c="orange">
                  {salary != null
                    ? `€ ${salary}`
                    : '(clicca per impostare)'
                    }
                </Text>
              </Text>
            </div>
          </Paper>

          {/* STATS */}
          <Paper radius="2xl" p="xl" withBorder shadow="sm">
            <Group mb="md">
              <ThemeIcon color="orange" variant="light" size={40}>
                <IconChartBar size={22} />
              </ThemeIcon>

              <Title order={3}>Statistiche</Title>
            </Group>

            <Divider mb="xl" />

            {isExpenseTotalStatsLoading ? (
              <Flex justify="center" py="xl">
                <Loader color="orange" />
              </Flex>
            ) : (
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                <StatCard
                  title="Totale acquisti"
                  value={`${
                    expenseTotalStats?.total_expenses_count ?? 0
                  }`}
                  icon={<IconReceipt2 size={24} />}
                  color="primary"
                />

                <StatCard
                  title="Totale spese"
                  value={`€ ${expenseTotalStats?.total_amount ?? 0}`}
                  icon={<IconCash size={24} />}
                  color="blue"
                />

                <StatCard
                  title="Spesa media"
                  value={`€ ${expenseTotalStats?.avg_amount ?? 0}`}
                  icon={<IconCreditCard size={24} />}
                  color="grape"
                />

                <StatCard
                  title="Spesa minima"
                  value={`€ ${expenseTotalStats?.min_amount ?? 0}`}
                  icon={<IconTrendingDown size={24} />}
                  color="teal"
                />

                <StatCard
                  title="Spesa massima"
                  value={`€ ${expenseTotalStats?.max_amount ?? 0}`}
                  icon={<IconTrendingUp size={24} />}
                  color="red"
                />
              </SimpleGrid>
            )}
          </Paper>
        </Stack>
      </Container>

      <ConfirmDialog
        opened={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={() => logout()}
        title="Sei sicuro di voler uscire?"
      />

      <ConfirmDialog
        opened={showSalaryDialog}
        onClose={() => {
          setTempSalary(0)
          setShowSalaryDialog(false)
        }}
        onConfirm={() => {
          setSalary(tempSalary > 0 ? Number(tempSalary) : null)
          updateSalary(tempSalary > 0 ? Number(tempSalary) : null)
          setShowSalaryDialog(false)
        }}
        title="Stipendio"
        input
        value={tempSalary}
        onChange={(val) => setTempSalary(Number(val) >= 0 ? Number(val) : 0)}
        min={0}
      />
    </>
  )
}