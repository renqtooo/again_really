import { Button, Card, Center, Checkbox, Container, Flex, Group, NumberInput, Text, Textarea } from '@mantine/core'
import Header from '../components/Header'
import { useCategory } from '../hooks/useCategory'
import { useReason } from '../hooks/useReason'
import Loading from '../components/Loading'
import { IconBottleFilled, IconCheck, IconCoffee, IconMoodAngry, IconPlus, IconSmoking } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import FloatingButton from '../components/FloatingButton'
import { useCreateExpense } from '../hooks/useExpense'
import AlertToast from '../components/AlertToast'

export default function ExpenseCreation() {
  const { data: categories, isLoading: isCategoriesLoading } = useCategory()
  const { data: reasons, isLoading: isReasonsLoading } = useReason()
  const {
    mutate: mutateCreateExpense,
    isLoading: isCreateLoading,
    isError: isCreateError,
    data: expense
  } = useCreateExpense()

  const isPageLoading = isCategoriesLoading || isReasonsLoading

  const iconMap = {
    IconCoffee,
    IconSmoking,
    IconBottleFilled,
    IconMoodAngry
  }

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedReason, setSelectedReason] = useState(null)
  const [selectedDecisionTime, setSelectedDecisionTime] = useState(null)
  const [selectedRegretLevel, setSelectedRegretLevel] = useState(null)
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [isOnline, setIsOnline] = useState(false)
  const [isInCompany, setIsInCompany] = useState(false)

  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const [alertToast, setAlertToast] = useState({
    title: '',
    message: '',
    color: 'error',
    isVisible: false,
    timeout: 3000
  })

  const showAlert = (isVisible = false, color = 'error', title = '', message = '', timeout = 3000) => {
    setAlertToast({ title, message, color, isVisible, timeout })
  }

  const selectCategory = (category) => {
    if (selectedCategory?.id === category.id_category) {
      setSelectedCategory(null)
      setPrice(0)
      return
    }
    setSelectedCategory({ id: category.id_category, price: category.usual_price })
    setPrice(category?.usual_price ? category.usual_price : 0)
  }

  const selectReason = (reason) => {
    if (selectedReason?.id === reason.id_reason) {
      setSelectedReason(null)
      return
    }
    setSelectedReason({ id: reason.id_reason })
  }

  const selectDecisionTime = (decision) => {
    if (selectedDecisionTime === decision) {
      setSelectedDecisionTime(null)
      return
    }
    setSelectedDecisionTime(decision)
  }

  const selectRegretLevel = (regret) => {
    if (selectedRegretLevel === regret) {
      setSelectedRegretLevel(null)
      return
    }
    setSelectedRegretLevel(regret)
  }

  const createExpense = () => {
    const payload = {
      id_category: selectedCategory.id,
      amount: price,
      description: description.trim() ? description : null,
      id_reason: selectedReason?.id ?? null,
      is_in_company: isInCompany,
      regret_level: selectedRegretLevel ?? null,
      is_online: isOnline,
      decision_time_level: selectedDecisionTime ?? null
    }

    mutateCreateExpense(payload)
  }

  const resetData = () => {
    setSelectedCategory(null)
    setSelectedReason(null)
    setPrice(0)
    setSelectedDecisionTime(null)
    setSelectedRegretLevel(null)
    setDescription('')
    setIsOnline(false)
    setIsInCompany(false)
  }

  useEffect(() => {
    if (expense) {
      showAlert(true, 'success', 'Spesa creata!', '', 1500)
      resetData()
    }
  }, [expense])

  useEffect(() => {
    if (isCreateError) showAlert(true, 'error', 'Si è verificato un errore!')
  }, [isCreateError])

  useEffect(() => {
    setIsBtnDisabled(!(selectedCategory && price > 0))
  }, [selectedCategory, price])

  return (
    <>
      <Header title={'Nuova Spesa'} />
      {isPageLoading && <Loading />}

      {!isPageLoading && (
        <Container style={{ height: '100dvh' }}>
          <Flex justify='center' align='center' direction='column' gap='lg'>
            <Card w='100%'>
              <Text size='xl' mb='lg' fw={700}>
                <Button mr='sm' size='xs'>
                  <IconPlus size={20} />
                </Button>
                Categoria
                <Text span c='error'>
                  *
                </Text>
              </Text>
              <Group justify='center'>
                {categories.map((category) => {
                  const IconComponent = iconMap[category.icon]

                  return (
                    <Button
                      color='accent'
                      key={category.id_category}
                      size='md'
                      variant={selectedCategory?.id === category.id_category ? 'filled' : 'outline'}
                      leftSection={IconComponent ? <IconComponent size={30} /> : null}
                      onClick={() => selectCategory(category)}
                    >
                      {category.name}
                    </Button>
                  )
                })}
              </Group>
            </Card>

            <Card w='100%'>
              <Text size='xl' mb='lg' fw={700}>
                Prezzo
                <Text span c='error'>
                  *
                </Text>
              </Text>
              <Center>
                <Text mr='xs' size='xl' fw={700}>
                  €
                </Text>
                <NumberInput
                  size='xl'
                  w='50%'
                  value={price}
                  onChange={(val) => setPrice(val >= 0 ? val : 0)}
                  min={0}
                  clampBehavior='strict'
                />
              </Center>
            </Card>

            <Group justify='space-around' w='100%'>
              <Checkbox
                size='md'
                color='accent'
                checked={isOnline}
                onChange={(event) => setIsOnline(event.currentTarget.checked)}
                label='Online'
              />

              <Checkbox
                size='md'
                color='accent'
                checked={isInCompany}
                onChange={(event) => setIsInCompany(event.currentTarget.checked)}
                label='In compagnia'
              />
            </Group>

            <Card w='100%'>
              <Text size='xl' mb='lg' fw={700}>
                <Button mr='sm' size='xs'>
                  <IconPlus size={20} />
                </Button>
                Motivo
              </Text>
              <Group justify='center'>
                {reasons.map((reason) => {
                  const IconComponent = iconMap[reason.icon]

                  return (
                    <Button
                      color='accent'
                      key={reason.id_reason}
                      size='md'
                      variant={selectedReason?.id === reason.id_reason ? 'filled' : 'outline'}
                      leftSection={IconComponent ? <IconComponent size={30} /> : null}
                      onClick={() => selectReason(reason)}
                    >
                      {reason.name}
                    </Button>
                  )
                })}
              </Group>
            </Card>

            <Card w='100%'>
              <Text size='xl' mb='lg' fw={700}>
                Quanto ci hai pensato?
                <Text span style={{ display: 'block' }} size='sm' c='dimmed'>
                  (1 istantaneo - 5 troppo)
                </Text>
              </Text>
              <Group justify='center'>
                {['#a44a4a', '#c16340', '#ccaa2e', '#4e8536', '#6f51b7'].map((d, i) => (
                  <Button
                    color={d}
                    variant={!selectedDecisionTime ? '' : selectedDecisionTime === i + 1 ? 'filled' : 'outline'}
                    key={i}
                    onClick={() => selectDecisionTime(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </Group>
            </Card>

            <Card w='100%'>
              <Text size='xl' mb='lg' fw={700}>
                Quanto ti sei pentito?
                <Text span style={{ display: 'block' }} size='sm' c='dimmed'>
                  (0 per niente - 3 troppo)
                </Text>
              </Text>
              <Group justify='center'>
                {['#4e8536', '#ccaa2e', '#c16340', '#a44a4a'].map((d, i) => (
                  <Button
                    color={d}
                    variant={!selectedRegretLevel ? '' : selectedRegretLevel === i + 1 ? 'filled' : 'outline'}
                    key={i}
                    onClick={() => selectRegretLevel(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </Group>
            </Card>

            <Card w='100%'>
              <Text size='xl' mb='xs' fw={700}>
                Descrizione
              </Text>
              <Textarea
                value={description}
                onChange={(event) => setDescription(event.currentTarget.value)}
                autosize
                minRows={2}
                maxRows={4}
                placeholder='Dettagli...'
              />
            </Card>
          </Flex>

          <div style={{ paddingBottom: '22vh' }}></div>
        </Container>
      )}

      <AlertToast
        title={alertToast.title}
        message={alertToast.message}
        color={alertToast.color}
        visible={alertToast.isVisible}
        timeout={alertToast.timeout}
        onClose={() => setAlertToast((alertToast) => (alertToast.isVisible = false))}
      />

      <FloatingButton
        onClick={createExpense}
        text='CREA'
        icon={<IconCheck size={25} />}
        loading={isCreateLoading}
        disabled={isBtnDisabled}
      />
    </>
  )
}
