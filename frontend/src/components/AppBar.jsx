import { Box, Group, Paper, ThemeIcon } from '@mantine/core'

import { IconEdit, IconHome2, IconUser } from '@tabler/icons-react'

import { useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  {
    icon: IconHome2,
    path: '/'
  },
  {
    icon: IconEdit,
    path: '/customize'
  },
  {
    icon: IconUser,
    path: '/profile'
  }
]

export default function AppBar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Box
      style={{
        position: 'fixed',
        bottom: 24,
        left: 16,
        right: 16,
        zIndex: 1000
      }}
    >
      <Paper
        radius='32px'
        px='lg'
        py='md'
        style={{
          background: 'linear-gradient(to top, rgba(13, 26, 59, 0.72) 0%, rgba(37, 56, 105, 0.78) 70%)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.35)'
        }}
      >
        <Group justify='space-between' align='center'>
          {tabs.map((tab, i) => {
            const active = location.pathname === tab.path
            const Icon = tab.icon

            return (
              <ThemeIcon
                key={i}
                size={58}
                radius='xl'
                variant={active ? 'gradient' : 'transparent'}
                gradient={{ from: 'blue', to: 'cyan' }}
                onClick={() => navigate(tab.path)}
                style={{
                  cursor: 'pointer',
                  transition: 'all .2s ease',
                  boxShadow: active ? '0 12px 30px rgba(59,130,246,0.35)' : 'none'
                }}
              >
                <Icon size={28} stroke={2} color={active ? 'white' : '#94a3b8'} />
              </ThemeIcon>
            )
          })}
        </Group>
      </Paper>

      {/* floating center glow */}
      <Box
        style={{
          position: 'absolute',
          width: 120,
          height: 40,
          background: 'rgba(59,130,246,0.35)',
          filter: 'blur(30px)',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: -10,
          zIndex: -1
        }}
      />
    </Box>
  )
}
