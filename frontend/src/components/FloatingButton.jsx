import { Button, Affix } from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'

function FloatingButton({ disabled = false, text, icon, ...props }) {
  return (
    <Affix position={{ bottom: 120, right: 30 }}>
      <Button {...props} disabled={disabled} radius='xl' size='lg' style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
        <div style={{ marginRight: '10px' }}>{icon ?? ''}</div>
        {text ?? ''}
      </Button>
    </Affix>
  )
}

export default FloatingButton
