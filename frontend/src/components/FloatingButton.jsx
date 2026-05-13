import {
  Affix,
  Button
} from '@mantine/core'

function FloatingButton({
  disabled = false,
  text,
  icon,
  ...props
}) {
  return (
    <Affix
      position={{
        bottom: 130,
        right: 24
      }}
    >
      <Button
        {...props}
        disabled={disabled}
        radius='100px'
        size='xl'
        variant='gradient'
        gradient={{
          from: disabled ? 'gray' : 'blue.6',
          to: disabled ? 'dark' : 'cyan.7'
        }}
        styles={{
          label: {
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: '1.3rem',
            fontWeight: 700,
            letterSpacing: 0.4
          }
        }}
      >
        {icon ?? ''}
        {text ?? ''}
      </Button>
    </Affix>
  )
}

export default FloatingButton