'use client';

import { Loader, Stack } from '@mantine/core';
import { ReactNode } from 'react';

export function ScreenLoader({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: JSX.Element | ReactNode;
}): ReactNode {
  return isLoading === true ? (
    <Stack w="100%" h="100%" justify="center" align="center">
      <Loader />
    </Stack>
  ) : (
    children
  );
}
