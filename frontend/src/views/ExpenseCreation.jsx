import { Button, Card, Center, Checkbox, Container, Flex, Group, NumberInput, Text } from '@mantine/core'
import Header from '../components/Header'
import { useCategory } from '../hooks/useCategory'
import { useReason } from '../hooks/useReason'
import Loading from '../components/Loading'
import { IconBottleFilled, IconCoffee, IconMoodAngry, IconPlus, IconSmoking } from '@tabler/icons-react'
import { useState } from 'react'

export default function ExpenseCreation() {
  const { data: categories, isLoading: isCategoriesLoading } = useCategory()
  const { data: reasons, isLoading: isReasonsLoading } = useReason()

  const isLoading = isCategoriesLoading || isReasonsLoading

  const iconMap = {
    IconCoffee,
    IconSmoking,
    IconBottleFilled,
    IconMoodAngry
  }

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedReason, setSelectedReason] = useState(null)
  const [price, setPrice] = useState(0)

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

  return (
    <>
      <Header title={'Nuova Spesa'} />

      {isLoading && <Loading />}

      {!isLoading && (
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
              <Checkbox label='Online' />
              <Checkbox label='In compagnia' />
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
                <Text size='sm' c='dimmed'>
                  (1 istantaneo - 5 troppo)
                </Text>
              </Text>
              <Group justify='center'>
                <Button color='error'>1</Button>
                <Button>2</Button>
                <Button color='yellow'>3</Button>
                <Button color='green'>4</Button>
                <Button color='accent'>5</Button>
              </Group>
            </Card>
          </Flex>
        </Container>
      )}
    </>
  )
}
