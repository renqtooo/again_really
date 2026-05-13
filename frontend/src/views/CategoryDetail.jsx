import { Box, Button, Card, Group, Input, NumberInput, Stack, Text } from '@mantine/core'

import Header from '../components/Header'

import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useEffect, useState } from 'react'

import { useDeleteCategory, useGetCategoryById, useUpdateCategory } from '../hooks/useCategory'

import { useAuth } from '../auth/AuthProvider'

import Loading from '../components/Loading'

import { roundCurrency } from '../composables/currency'

import AlertToast from '../components/AlertToast'

import { IconDeviceFloppy, IconHeart, IconHeartOff, IconPlus, IconTrashX } from '@tabler/icons-react'

export default function CategoryDetail() {
  const { id: id_category } = useParams()
  const { session } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const isCreating = id_category === '0'
  const from = location.state?.from

  const { data: getCategory, isLoading: isGetCategoryLoading } = useGetCategoryById(isCreating ? null : id_category)

  const { mutate: updateCategory, isLoading: isUpdateCategoryLoading } = useUpdateCategory()

  const { mutate: deleteCategory } = useDeleteCategory()

  const [category, setCategory] = useState({
    name: '',
    usual_price: null,
    id_profile: session.user.id,
    is_favourite: false
  })

  const [alertToast, setAlertToast] = useState({
    isVisible: false
  })

  const handleUpdateCategory = () => {
    const updatedCategory = {
      ...category,
      name: category.name.trim(),
      usual_price:
        category.usual_price != null
          ? roundCurrency(category.usual_price) > 0
            ? roundCurrency(category.usual_price)
            : null
          : null
    }

    setCategory(updatedCategory)

    updateCategory(updatedCategory, {
      onSuccess: (data) => {
        setCategory(data)

        setAlertToast({
          title: 'Categoria salvata!',
          color: 'green',
          isVisible: true
        })

        if (isCreating) {
          if (from === 'customize') {
            navigate('/category/' + data.id_category, {
              state: { from: 'categoryCreation' }
            })
          } else if (from === 'expenseCreation') {
            navigate(-1)
          } else {
            navigate('/category/' + data.id_category)
          }
        }
      },

      onError: () => {
        setAlertToast({
          title: 'Errore!',
          color: 'red',
          isVisible: true
        })
      }
    })
  }

  const handleDeleteCategory = () => {
    if (category.id_profile) {
      deleteCategory(category.id_category, {
        onSuccess: () => {
          const route = from === 'categoryCreation' ? -2 : from === 'customize' ? -1 : ''

          navigate(route)
        }
      })
    }
  }

  const isBtnDisabled =
    category.name.trim() === '' ||
    (category.usual_price != null && category.usual_price <= 0) ||
    (category.name.trim() === getCategory?.name?.trim() &&
      category.usual_price === getCategory?.usual_price &&
      category.is_favourite === getCategory?.is_favourite)

  useEffect(() => {
    if (getCategory) setCategory(getCategory)
  }, [getCategory])

  return (
    <Box
      style={{
        minHeight: '100dvh',
        background: 'linear-gradient(180deg, #0f172a 0%, #111827 45%, #020617 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Header title={'Categoria'} />

      {/* blur bg */}
      <Box
        style={{
          position: 'absolute',
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: '#3b82f6',
          filter: 'blur(120px)',
          top: -100,
          right: -100,
          opacity: 0.35
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
          bottom: 50,
          left: -80,
          opacity: 0.3
        }}
      />

      {!isCreating && isGetCategoryLoading && <Loading />}

      <Stack
        align='center'
        px='lg'
        py='xl'
        style={{
          position: 'relative',
          zIndex: 2
        }}
      >
        <Card
          w='100%'
          maw={520}
          radius='32px'
          p='xl'
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))',

            border: '1px solid rgba(255,255,255,0.08)',

            backdropFilter: 'blur(20px)'
          }}
        >
          <Stack gap='xl'>
            <Text c='white' fw={900} size='30px'>
              {isCreating ? 'Nuova' : 'Modifica'} categoria
            </Text>

            <Input
              size='xl'
              radius='xl'
              placeholder='Nome'
              value={category.name}
              onChange={(e) =>
                setCategory({
                  ...category,
                  name: e.currentTarget.value.trimStart()
                })
              }
              styles={{
                input: {
                  height: 62,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 700
                }
              }}
            />

            <Group justify='center'>
              <NumberInput
                size='xl'
                w='80%'
                value={category.usual_price ?? ''}
                onChange={(val) => {
                  if (val === '') {
                    setCategory({
                      ...category,
                      usual_price: null
                    })

                    return
                  }

                  const num = Number(val)

                  setCategory({
                    ...category,
                    usual_price: num >= 0 ? num : null
                  })
                }}
                placeholder='Prezzo solito'
                clampBehavior='strict'
                min={0}
                hideControls
                radius='xl'
                styles={{
                  input: {
                    height: 70,
                    textAlign: 'center',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'white',
                    fontWeight: 700
                  }
                }}
              />

              <Text size='34px' fw={700} c='white'>
                €
              </Text>
            </Group>

            <Box
              pos='relative'
              w='100%'
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Button
                size='xs'
                radius='xl'
                color='transparent'
                onClick={() =>
                  setCategory({
                    ...category,
                    is_favourite: !category.is_favourite
                  })
                }
                loading={isUpdateCategoryLoading}
                style={{
                  position: 'absolute',
                  left: 0
                }}
              >
                {category.is_favourite ? <IconHeartOff size={25} /> : <IconHeart size={25} />}
              </Button>

              <Button
                size='xl'
                radius='xl'
                variant='gradient'
                gradient={{
                  from: 'blue',
                  to: 'cyan'
                }}
                onClick={handleUpdateCategory}
                loading={isUpdateCategoryLoading}
                disabled={isBtnDisabled}
                leftSection={isCreating ? <IconPlus /> : <IconDeviceFloppy />}
                style={{
                  height: 64,
                  boxShadow: !isBtnDisabled ? '0 20px 40px rgba(59,130,246,0.35)' : ''
                }}
              >
                {isCreating ? 'Crea' : 'Salva'}
              </Button>
            </Box>
          </Stack>
        </Card>

        {!isCreating && category.id_profile && !isGetCategoryLoading && (
          <Button
            mt='md'
            size='xl'
            radius='xl'
            onClick={handleDeleteCategory}
            color='error'
            loading={isUpdateCategoryLoading}
            leftSection={<IconTrashX />}
            style={{
              background: 'rgba(239,68,68,0.12)',

              border: '1px solid rgba(239,68,68,0.22)',

              color: '#fca5a5'
            }}
          >
            Elimina categoria
          </Button>
        )}
      </Stack>

      <AlertToast
        title={alertToast.title}
        color={alertToast.color}
        visible={alertToast.isVisible}
        onClose={() =>
          setAlertToast((prev) => ({
            ...prev,
            isVisible: false
          }))
        }
      />
    </Box>
  )
}
