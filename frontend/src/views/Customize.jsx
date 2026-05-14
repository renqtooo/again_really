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
  IconSettings,
  IconHeart,
  IconPlus,
  IconHeartFilled
} from '@tabler/icons-react'

import Loading from '../components/Loading'

import Header from '../components/Header'

import FloatingButton from '../components/FloatingButton'

import {
  useCategory,
  useUpdateCategory
} from '../hooks/useCategory'

import { iconMap } from '../composables/category'

import ConfirmDialog from '../components/ConfirmDialog'

import { useState } from 'react'

import { formatCurrency } from '../composables/currency'
import { useNavigate } from 'react-router-dom'

export default function Customize() {
  const {
    data: categories,
    isLoading: isCategoriesLoading
  } = useCategory()

  const navigate = useNavigate()

  const { mutate: updateCategory } = useUpdateCategory()

  const updateFavourite = (category) => {
    category.is_favourite = !category.is_favourite
    updateCategory(category)
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
              <Stack mb='xl' pb='xl' gap='md'>
                {categories?.map((category) => {
                  const IconComponent = iconMap[category?.icon]

                  return (
                    <Card
                      key={category?.id_category}
                      radius='28px'
                      p='xs'
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
                              <br />
                              {category?.usual_price && (
                                <Text
                                  component='span'
                                  fw={900}
                                  size='lg'
                                  c='accent'
                                  truncate
                                >
                                  € {formatCurrency(category?.usual_price)}
                                </Text>
                              )}
                            </Text>
                          </Box>
                        </Group>

                        <Group gap='xs'>
                          <Button
                            radius='xl'
                            variant='transparent'
                            onClick={() => navigate('/category/' + category.id_category, {state:{from:'customize'}})}
                            size='xs'
                            style={{padding: '0', width: '2.5rem'}}
                          >
                            <IconEdit size={30} />
                          </Button>

                          <Button
                            radius='xl'
                            variant='transparent'
                            onClick={() => updateFavourite(category)}
                            size='xs'
                            style={{padding: '0', width: '2.5rem'}}
                          >
                            {category.is_favourite
                              ? <IconHeartFilled size={25} />
                              : <IconHeart size={25} />
                            }
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

      <FloatingButton
          onClick={() => navigate('/category/0', {state:{from:'customize'}})}
          icon={<IconPlus size={25} />}
      />
    </>
  )
}