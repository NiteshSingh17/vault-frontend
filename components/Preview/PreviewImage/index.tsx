'use client';

import { Box } from '@mantine/core';
import Image from 'next/image';

export interface PreviewImagePropos {
  url: string;
}

export function PreviewImage({ url }: PreviewImagePropos): JSX.Element {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <Box pos="relative" h={500}>
        <Image fill src={url} alt="image" />
      </Box>
    </a>
  );
}
