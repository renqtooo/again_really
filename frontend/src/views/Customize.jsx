import { Button, Card, Container, Group, Stack, Text } from '@mantine/core'
import Loading from '../components/Loading'
import Header from '../components/Header'
import { useCategory, useUpdateCategory } from '../hooks/useCategory'
import { iconMap } from '../composables/category'
import ConfirmDialog from '../components/ConfirmDialog'
import { useState } from 'react'
import { formatCurrency } from '../composables/currency'

export default function Customize() {
  const { data: categories, isLoading: isCategoriesLoading } = useCategory()
  const { mutate: updateCategory } = useUpdateCategory()

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showDialog, setShowDialog] = useState(false)

  const selectCategory = (category) => {
    setSelectedCategory({
      id_category: category.id_category,
      name: category.name,
      usual_price: category.usual_price,
      icon: category.icon
    })
    setShowDialog(true)
  }

  const handleUpdateCategory = (category) => {
    updateCategory(category)
    setShowDialog(false)
  }

  return (
    <>
      <Header title='Personalizza' />

      {isCategoriesLoading && <Loading />}

      <Container style={{ height: '90dvh' }}>
        <Stack>
          {categories?.map((category) => {
            const IconComponent = iconMap[category?.icon]

            return (
              <Card key={category?.id_category}>
                <Group gap='xs' justify='space-between'>
                  <Group>
                    {IconComponent ? <IconComponent size={30} /> : null}
                    <Text fw={700}>{category?.name}</Text>
                  </Group>
                  <Group>
                    {category?.usual_price && <Text fw={700}>{formatCurrency(category?.usual_price)} €</Text>}
                    <Button onClick={() => selectCategory(category)}>Modifica</Button>
                  </Group>
                </Group>
              </Card>
            )
          })}
        </Stack>
      </Container>

      <ConfirmDialog
        opened={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={() => handleUpdateCategory(selectedCategory)}
        title={'Modifica prezzo ' + selectedCategory?.name}
        input
        value={selectedCategory?.usual_price}
        min={0}
        onChange={() => setSelectedCategory({ ...selectedCategory, usual_price: event.target.value })}
      />
    </>
  )
}
