'use client';

import { AppShell, Burger, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';
import classes from './layout.module.css';

const SidebarS = dynamic(() => import('../../components/Sidebar/index'), { ssr: false });
export default function Layout({ children }: PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: { base: 60, sm: 0 } }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
    >
      <AppShell.Navbar>
        <SidebarS toggleSidebar={toggle} />
      </AppShell.Navbar>
      <AppShell.Header>
        <Group h="100%" p="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Group gap={0} className={classes.container}>
          <Stack flex={1} mah="100vh" style={{ overflow: 'auto' }}>
            {children}
          </Stack>
        </Group>
      </AppShell.Main>
    </AppShell>
  );
}
