import { Button, Group, Modal, NumberInput, Stack, Text } from '@mantine/core'
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
  color = 'error',
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
    <Modal opened={opened} onClose={onClose} title={title} centered radius='lg'>
      <Stack>
        <Text c='dimmed'>{message}</Text>

        {input && (
          <NumberInput ref={inputRef} size='xl' value={value} onChange={onChange} min={min} clampBehavior='strict' />
        )}

        <Group justify='flex-end' mt='md'>
          <Button variant='default' onClick={onClose}>
            {cancelText}
          </Button>

          <Button color={color} loading={loading} onClick={onConfirm}>
            {confirmText}
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
