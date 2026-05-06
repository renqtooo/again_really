import { Paper, Group, Stack, Text } from '@mantine/core';
import { IconHome, IconSearch, IconUser } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { icon: IconHome, path: '/' },
  { icon: IconSearch, path: '/' },
  { icon: IconUser, path: '/profile' },
];

export default function AppBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Paper
      withBorder
      shadow="md"
      radius="xl"
      p="xs"
      style={{
        position: 'fixed',
        bottom: 25,
        left: 10,
        right: 10,
        zIndex: 1000,
      }}
    >
      <Group justify="space-around">
        {tabs.map((tab, i) => {
          const active = location.pathname === tab.path;
          const Icon = tab.icon;

          return (
            <Icon
              key={i}
              size={50}
              stroke={active ? 1.5 : 1}
              color={active ? 'blue' : 'gray'}
              onClick={() => navigate(tab.path)}
            />
          );
        })}
      </Group>
    </Paper>
  );
}