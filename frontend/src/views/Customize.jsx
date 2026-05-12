import {
  Box,
  Button,
  Card,
  Container,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title
} from '@mantine/core'

import {
  IconEdit,
  IconSettings
} from '@tabler/icons-react'

import Loading from '../components/Loading'

import Header from '../components/Header'

import {
  useCategory,
  useUpdateCategory
} from '../hooks/useCategory'

import { iconMap } from '../composables/category'

import ConfirmDialog from '../components/ConfirmDialog'

import { useState } from 'react'

import { formatCurrency } from '../composables/currency'

export default function Customize() {
  const {
    data: categories,
    isLoading: isCategoriesLoading
  } = useCategory()

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
      <Box
        style={{
          minHeight: '100dvh',
          background:
            'linear-gradient(180deg, #0f172a 0%, #111827 45%, #020617 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Header title='Personalizza' />

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

        {isCategoriesLoading && <Loading />}

        {!isCategoriesLoading && (
          <Container
            size='sm'
            pb={140}
            style={{
              position: 'relative',
              zIndex: 2
            }}
          >
            <Stack gap='lg'>
              {/* HERO */}
              <Card
                radius='32px'
                p='xl'
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.05))',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(20px)',
                  color: 'white'
                }}
              >
                <Text style={{textAlign: 'center'}} size='xl' c='gray.4' fw={700}>
                  Configura categorie
                </Text>
              </Card>

              {/* CATEGORY LIST */}
              <Stack gap='md'>
                {categories?.map((category) => {
                  const IconComponent = iconMap[category?.icon]

                  return (
                    <Card
                      key={category?.id_category}
                      radius='28px'
                      p='lg'
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        backdropFilter: 'blur(18px)',
                        border: '1px solid rgba(255,255,255,0.08)'
                      }}
                    >
                      <Group justify='space-between' wrap='nowrap'>
                        <Group gap='md' style={{ flex: 1, minWidth: 0 }}>
                          <ThemeIcon
                            size={54}
                            radius='xl'
                            variant='gradient'
                            gradient={{ from: 'violet', to: 'grape' }}
                          >
                            {IconComponent ? (
                              <IconComponent size={26} />
                            ) : null}
                          </ThemeIcon>

                          <Box style={{ flex: 1, minWidth: 0 }}>
                            <Text
                              fw={800}
                              size='lg'
                              c='white'
                              truncate
                            >
                              {category?.name}
                            </Text>
                          </Box>
                        </Group>

                        <Group gap='sm'>
                          {category?.usual_price && (
                            <Text
                              fw={900}
                              size='lg'
                              c='violet'
                            >
                              € {formatCurrency(category?.usual_price)}
                            </Text>
                          )}

                          <Button
                            radius='xl'
                            variant='gradient'
                            gradient={{ from: 'blue', to: 'cyan' }}
                            onClick={() => selectCategory(category)}
                          >
                            <IconEdit size={30} />
                          </Button>
                        </Group>
                      </Group>
                    </Card>
                  )
                })}
              </Stack>
            </Stack>
          </Container>
        )}
      </Box>

      <ConfirmDialog
        opened={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={() => handleUpdateCategory(selectedCategory)}
        title={'Modifica prezzo ' + selectedCategory?.name}
        input
        value={selectedCategory?.usual_price}
        min={0}
        onChange={(val) =>
          setSelectedCategory({
            ...selectedCategory,
            usual_price: val >= 0 ? Number(val) : 0
          })
        }
      />
    </>
  )
}