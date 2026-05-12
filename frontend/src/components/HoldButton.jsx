import { useState, useRef, useEffect } from 'react'
import { ActionIcon, RingProgress, Box, useMantineTheme } from '@mantine/core'

const HoldButton = ({ icon, holdTime = 1200, onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [isHolding, setIsHolding] = useState(false)
  const theme = useMantineTheme()

  const requestRef = useRef()
  const lastTimeRef = useRef()
  const hasTriggeredRef = useRef(false)

  const startColor = theme.colors.gray[9]
  const endColor = theme.colors.accent[6]

  const animate = (time) => {
    if (lastTimeRef.current !== undefined) {
      const deltaTime = time - lastTimeRef.current

      setProgress((prev) => {
        const step = (100 / holdTime) * deltaTime

        if (isHolding) {
          if (prev >= 100) {
            if (!hasTriggeredRef.current) {
              onComplete?.()
              hasTriggeredRef.current = true
            }
            return 100
          }
          return Math.min(prev + step, 100)
        } else {
          hasTriggeredRef.current = false
          return Math.max(prev - step * 3.5, 0)
        }
      })
    }
    lastTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(requestRef.current)
      lastTimeRef.current = undefined
    }
  }, [isHolding])

  return (
    <Box
      pos='relative'
      w={80}
      h={80}
      onMouseDown={() => setIsHolding(true)}
      onMouseUp={() => setIsHolding(false)}
      onMouseLeave={() => setIsHolding(false)}
      onTouchStart={() => setIsHolding(true)}
      onTouchEnd={() => setIsHolding(false)}
      style={{
        userSelect: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      {/* Cerchio progresso esterno */}
      <RingProgress
        size={90}
        thickness={4}
        roundCaps
        sections={[{ value: progress, color: progress >= 100 ? 'secondary' : 'tranparent' }]}
        bg='transparent'
        styles={{
          root: {
            position: 'absolute',
            zIndex: 3,
            pointerEvents: 'none'
          }
        }}
      />

      {/* Pulsante con espansione dal centro */}
      <ActionIcon
        variant='default'
        size={72}
        radius='xl'
        style={{
          zIndex: 1,
          overflow: 'hidden',
          border: 'none',
          transition: 'transform 0.15s ease',
          transform: isHolding ? 'scale(0.95)' : 'scale(1)',
          background: `radial-gradient(circle, ${endColor} ${progress - 10}%, ${startColor} ${progress + 5}%)`,
          color: 'white'
        }}
      >
        <Box
          pos='absolute'
          inset={0}
          style={{
            backgroundColor: 'rgba(0,0,0,0.05)',
            opacity: isHolding ? 0 : 1,
            transition: 'opacity 0.3s'
          }}
        />

        <Box style={{ zIndex: 2, display: 'flex' }}>{icon}</Box>
      </ActionIcon>
    </Box>
  )
}

export default HoldButton
