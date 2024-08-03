'use client';

import { ActionIcon, Box } from '@mantine/core';
import { Editor } from '@tiptap/react';
import { ChangeEventHandler, useRef } from 'react';
import { FaImage } from 'react-icons/fa';

export function ImageUpload({ editor }: { editor: Editor | null }): JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    inputRef.current?.click();
  };
  const readFile: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { files } = event.target;
    if (!files || !files[0]) return;

    const FR = new FileReader();

    FR.addEventListener('load', (evt) => {
      const base64 = evt?.target?.result;
      editor?.chain().focus('end').insertContent(`<img src="${base64}" />`).run();
    });

    FR.readAsDataURL(files[0]);
  };

  return (
    <ActionIcon variant="outline" color="gray" onClick={handleClick}>
      <FaImage />
      <Box style={{ display: 'none' }}>
        <input accept="image/*" onChange={readFile} type="file" ref={inputRef} />
      </Box>
    </ActionIcon>
  );
}
