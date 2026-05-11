import { Card, Group, Text, ThemeIcon } from '@mantine/core'

export default function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <Card shadow="sm" radius="xl" p="lg" withBorder>
      <Group justify="space-between">
        <div>
          <Text c="dimmed" size="sm">
            {title}
          </Text>

          <Text fw={700} size="1.8rem">
            {value}
          </Text>
        </div>

        <ThemeIcon color={color} size={50} radius="xl">
          {icon}
        </ThemeIcon>
      </Group>
    </Card>
  )
}