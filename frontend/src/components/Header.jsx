import { Divider, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core'

export default function Header({ title = '' }) {
  const theme = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const bg = colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0]

  return (
    <div style={{ position: 'sticky', top: '0', width: '100%', zIndex: 100, background: bg }}>
      <Title pl='xl' pt='sm'>
        {title}
      </Title>
      <Divider my='sm'></Divider>
    </div>
  )
}
