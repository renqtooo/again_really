import { useEffect } from 'react'
import { Alert, Transition, Box } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'

export default function AlertToast({ title, message, color, visible, timeout = 3000, onClose }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose()
      }, timeout)

      return () => clearTimeout(timer)
    }
  }, [visible, onClose])

  return (
    <Transition mounted={visible} transition='slide-up' duration={200} timingFunction='ease'>
      {(styles) => (
        <Box
          style={{
            position: 'fixed',
            bottom: 100,
            width: '100%',
            zIndex: 999,
            boxShadow: '0 0px 26px rgba(0,0,0,0.3)',
            ...styles
          }}
        >
          <Alert
            icon={<IconAlertCircle size={16} />}
            title={title}
            color={color}
            variant='filled'
            withCloseButton
            onClose={onClose}
          >
            {message}
          </Alert>
        </Box>
      )}
    </Transition>
  )
}
