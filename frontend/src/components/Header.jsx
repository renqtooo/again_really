import { Box, Divider, Group, Text } from '@mantine/core'

export default function Header({ title = '' }) {
  return (
    <Box
      mb='lg'
      style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 100,
        backdropFilter: 'blur(24px)',
        background: 'rgba(15,23,42,0.72)',
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}
    >
      <Group px='xl' py='lg' justify='space-between' align='center'>
        <Text
          fw={900}
          size='32px'
          c='white'
          style={{
            letterSpacing: '-1px'
          }}
        >
          {title}
        </Text>
      </Group>

      <Divider color='rgba(255,255,255,0.06)' />
    </Box>
  )
}
