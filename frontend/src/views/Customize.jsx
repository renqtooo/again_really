import { Box, Card, Container, Stack, Text } from '@mantine/core'

import { IconPlus } from '@tabler/icons-react'

import Header from '../components/Header'

import FloatingButton from '../components/FloatingButton'

import { useNavigate } from 'react-router-dom'
import CategoryList from '../components/CategoryList'

export default function Customize() {
  const navigate = useNavigate()

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
                background: 'linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.05))',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(20px)',
                color: 'white'
              }}
            >
              <Text style={{ textAlign: 'center' }} size='xl' c='gray.4' fw={700}>
                Configura categorie
              </Text>
            </Card>

            <CategoryList editBtn favouriteBtn />
          </Stack>
        </Container>
      </Box>

      <FloatingButton
        onClick={() => navigate('/category/0', { state: { from: 'customize' } })}
        icon={<IconPlus size={25} />}
      />
    </>
  )
}
