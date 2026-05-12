import { Box, Button, Card, Center, Checkbox, Container, Flex, Group, NumberInput, Text, Textarea } from '@mantine/core'

import { IconCheck, IconPlus } from '@tabler/icons-react'

import Header from '../components/Header'

import { useCategory } from '../hooks/useCategory'
import { useReason } from '../hooks/useReason'

import Loading from '../components/Loading'

import { useEffect, useState } from 'react'

import FloatingButton from '../components/FloatingButton'

import { useCreateExpense } from '../hooks/useExpense'

import AlertToast from '../components/AlertToast'

import { iconMap } from '../composables/category'

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
    setAlertToast({
      title,
      message,
      color,
      isVisible,
      timeout
    })
  }

  const selectCategory = (category) => {
    if (selectedCategory?.id === category.id_category) {
      setSelectedCategory(null)
      setPrice(0)
      return
    }

    setSelectedCategory({
      id: category.id_category,
      price: category.usual_price
    })

    setPrice(category?.usual_price ? category.usual_price : 0)
  }

  const selectReason = (reason) => {
    if (selectedReason?.id === reason.id_reason) {
      setSelectedReason(null)
      return
    }

    setSelectedReason({
      id: reason.id_reason
    })
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
    setIsBtnDisabled(true)
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
    setIsBtnDisabled(true)
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
    if (isCreateError) {
      showAlert(true, 'error', 'Si è verificato un errore!')
    }
  }, [isCreateError])

  useEffect(() => {
    setIsBtnDisabled(!(selectedCategory && price > 0))
  }, [selectedCategory, price])

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
        <Header title={'Nuova Spesa'} />

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

        {isPageLoading && <Loading />}

        {!isPageLoading && (
          <Container
            size='sm'
            pb={180}
            style={{
              position: 'relative',
              zIndex: 2
            }}
          >
            <Flex direction='column' gap='lg'>
              {/* CATEGORY */}
              <Card
                radius='32px'
                p='xl'
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.05))',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                <Text size='xl' mb='lg' fw={800} c='white'>
                  <Button mr='sm' radius='xl' variant='gradient' gradient={{ from: 'blue', to: 'cyan' }} size='xs'>
                    <IconPlus size={18} />
                  </Button>
                  Categoria
                  <Text span c='red.4'>
                    *
                  </Text>
                </Text>

                <Group justify='center'>
                  {categories.map((category) => {
                    const IconComponent = iconMap[category.icon]

                    return (
                      <Button
                        key={category.id_category}
                        radius='xl'
                        size='md'
                        variant={selectedCategory?.id === category.id_category ? 'gradient' : 'light'}
                        gradient={{ from: 'blue', to: 'cyan' }}
                        color='gray'
                        leftSection={IconComponent ? <IconComponent size={24} /> : null}
                        onClick={() => selectCategory(category)}
                      >
                        {category.name}
                      </Button>
                    )
                  })}
                </Group>
              </Card>

              {/* PRICE */}
              <Card
                radius='32px'
                p='xl'
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(18px)',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
              >
                <Text size='xl' mb='lg' fw={800} c='white'>
                  Prezzo
                  <Text span c='red.4'>
                    *
                  </Text>
                </Text>

                <Center>
                  <Text mr='sm' size='42px' fw={900} c='white'>
                    €
                  </Text>

                  <NumberInput
                    size='xl'
                    w='50%'
                    value={price}
                    onChange={(val) => setPrice(val >= 0 ? val : 0)}
                    min={0}
                    clampBehavior='strict'
                    hideControls
                    styles={{
                      input: {
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'white',
                        borderRadius: 20,
                        fontSize: 28,
                        fontWeight: 800,
                        textAlign: 'center',
                        height: 64
                      }
                    }}
                  />
                </Center>
              </Card>

              {/* CHECKBOX */}
              <Group justify='space-around'>
                <Checkbox
                  size='md'
                  color='cyan'
                  checked={isOnline}
                  onChange={(event) => setIsOnline(event.currentTarget.checked)}
                  label={
                    <Text c='white' fw={600}>
                      Online
                    </Text>
                  }
                />

                <Checkbox
                  size='md'
                  color='violet'
                  checked={isInCompany}
                  onChange={(event) => setIsInCompany(event.currentTarget.checked)}
                  label={
                    <Text c='white' fw={600}>
                      In compagnia
                    </Text>
                  }
                />
              </Group>

              {/* REASON */}
              <Card
                radius='32px'
                p='xl'
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(18px)',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
              >
                <Text size='xl' mb='lg' fw={800} c='white'>
                  <Button mr='sm' radius='xl' variant='gradient' gradient={{ from: 'violet', to: 'grape' }} size='xs'>
                    <IconPlus size={18} />
                  </Button>
                  Motivo
                </Text>

                <Group justify='center'>
                  {reasons.map((reason) => {
                    const IconComponent = iconMap[reason.icon]

                    return (
                      <Button
                        key={reason.id_reason}
                        radius='xl'
                        size='md'
                        variant={selectedReason?.id === reason.id_reason ? 'gradient' : 'light'}
                        gradient={{ from: 'violet', to: 'grape' }}
                        color='gray'
                        leftSection={IconComponent ? <IconComponent size={24} /> : null}
                        onClick={() => selectReason(reason)}
                      >
                        {reason.name}
                      </Button>
                    )
                  })}
                </Group>
              </Card>

              {/* DECISION TIME */}
              <Card
                radius='32px'
                p='xl'
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(18px)',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
              >
                <Text size='xl' mb='lg' fw={800} c='white'>
                  Quanto ci hai pensato?
                  <Text span display='block' size='sm' c='gray.4'>
                    (1 istantaneo - 5 troppo)
                  </Text>
                </Text>

                <Group justify='center'>
                  {['#a44a4a', '#c16340', '#ccaa2e', '#4e8536', '#6f51b7'].map((d, i) => (
                    <Button
                      radius='xl'
                      color={d}
                      variant={selectedDecisionTime === i + 1 ? 'filled' : 'outline'}
                      key={i}
                      onClick={() => selectDecisionTime(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </Group>
              </Card>

              {/* REGRET */}
              <Card
                radius='32px'
                p='xl'
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(18px)',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
              >
                <Text size='xl' mb='lg' fw={800} c='white'>
                  Quanto ti sei pentito?
                  <Text span display='block' size='sm' c='gray.4'>
                    (0 per niente - 3 troppo)
                  </Text>
                </Text>

                <Group justify='center'>
                  {['#4e8536', '#ccaa2e', '#c16340', '#a44a4a'].map((d, i) => (
                    <Button
                      radius='xl'
                      color={d}
                      variant={selectedRegretLevel === i + 1 ? 'filled' : 'outline'}
                      key={i}
                      onClick={() => selectRegretLevel(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </Group>
              </Card>

              {/* DESCRIPTION */}
              <Card
                radius='32px'
                p='xl'
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(18px)',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
              >
                <Text size='xl' mb='md' fw={800} c='white'>
                  Descrizione
                </Text>

                <Textarea
                  value={description}
                  onChange={(event) => setDescription(event.currentTarget.value)}
                  autosize
                  minRows={2}
                  maxRows={4}
                  placeholder='Dettagli...'
                  styles={{
                    input: {
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'white',
                      borderRadius: 20,
                      padding: '10px'
                    }
                  }}
                />
              </Card>
            </Flex>
          </Container>
        )}

        <AlertToast
          title={alertToast.title}
          message={alertToast.message}
          color={alertToast.color}
          visible={alertToast.isVisible}
          timeout={alertToast.timeout}
          onClose={() =>
            setAlertToast((alertToast) => ({
              ...alertToast,
              isVisible: false
            }))
          }
        />

        <FloatingButton
          onClick={createExpense}
          text='CREA'
          icon={<IconCheck size={25} />}
          loading={isCreateLoading}
          disabled={isBtnDisabled}
        />
      </Box>
    </>
  )
}
