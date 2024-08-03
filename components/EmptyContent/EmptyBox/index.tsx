'use client';

import { Button, Group, Stack, Text } from '@mantine/core';
import { FaFile, FaFolder } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';
import classes from './emptyBox.module.css';

export interface EmptyBoxPropos {
  onAddFile: () => void;
  onAddFolder: () => void;
}

export function EmptyBox({ onAddFile, onAddFolder }: EmptyBoxPropos): JSX.Element {
  return (
    <div className={classes.container}>
      <Stack justify="center" align="center">
        <MdErrorOutline size={30} />
        <Text>Nothing found</Text>
        <Group mt={20}>
          <Button leftSection={<FaFolder />} onClick={onAddFolder}>
            Create folder
          </Button>
          <Button leftSection={<FaFile />} onClick={onAddFile}>
            Create new item
          </Button>
        </Group>
      </Stack>
    </div>
  );
}
