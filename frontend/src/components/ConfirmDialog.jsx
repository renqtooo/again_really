import {
  Button,
  Group,
  Modal,
  NumberInput,
  Stack,
  Text
} from '@mantine/core'

import { useEffect, useRef } from 'react'

export default function ConfirmDialog({
  opened,
  onClose,
  onConfirm,
  title = '',
  message = '',
  confirmText = 'Conferma',
  cancelText = 'Annulla',
  loading = false,
  color = 'red',
  input,
  value,
  min,
  onChange
}) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (opened) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 200)
    }
  }, [opened])

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={800} size='lg' c='white'>
          {title}
        </Text>
      }
      centered
      radius='32px'
      overlayProps={{
        backgroundOpacity: 0.7,
        blur: 8
      }}
      styles={{
        content: {
          background:
            'linear-gradient(135deg, rgba(15,23,42,0.98), rgba(17,24,39,0.96))',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(24px)',
          color: 'white',
          overflow: 'hidden'
        },

        header: {
          background: 'transparent',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          paddingBottom: 16
        },

        body: {
          paddingTop: 24
        },

        close: {
          color: 'white'
        }
      }}
    >
      <Stack gap='lg'>
        {message && (
          <Text c='gray.4' size='sm'>
            {message}
          </Text>
        )}

        {input && (
          <NumberInput
            ref={inputRef}
            size='xl'
            value={value}
            onChange={onChange}
            min={min}
            clampBehavior='strict'
            hideControls
            styles={{
              input: {
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'white',
                borderRadius: 22,
                height: 64,
                fontSize: 26,
                fontWeight: 800,
                textAlign: 'center'
              }
            }}
          />
        )}

        <Group grow mt='md'>
          <Button
            radius='xl'
            size='md'
            variant='light'
            color='gray'
            onClick={onClose}
            styles={{
              root: {
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'white'
              }
            }}
          >
            {cancelText}
          </Button>

          <Button
            radius='xl'
            size='md'
            variant='gradient'
            gradient={{
              from:
                color === 'red'
                  ? 'red'
                  : color === 'green'
                    ? 'teal'
                    : 'blue',

              to:
                color === 'red'
                  ? 'pink'
                  : color === 'green'
                    ? 'lime'
                    : 'cyan'
            }}
            loading={loading}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}