'use client';

import { useUploadMediaFiles } from '@/api/hook';
import { accessibleOnClick } from '@/utils';
import { Box, FileInput, FileInputProps, Loader } from '@mantine/core';
import { MouseEventHandler, useRef, useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import classes from './uploadFileButton.module.css';

export interface UploadFileButtonPropos extends FileInputProps {
  onUploadEnd?: (files: string) => void;
  folder: string;
}

export function UploadFileButton({
  folder,
  onUploadEnd,
  ...props
}: UploadFileButtonPropos): JSX.Element {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLButtonElement>(null);
  const { mutate: uploadFile, isPending: isUploadingFile } = useUploadMediaFiles({
    onSuccess: ({ data }) => {
      onUploadEnd?.(data.fileURL);
    },
    onError: console.log,
  });

  const handleChange: FileInputProps['onChange'] = (file) => {
    if (file instanceof File) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      setFileName(file.name);
      uploadFile(formData);
    }
  };

  const handleFileUploadClick: MouseEventHandler<HTMLDivElement> = () => {
    inputRef.current?.click();
  };

  return (
    <Box>
      <Box {...accessibleOnClick(handleFileUploadClick)} className={classes.container}>
        {isUploadingFile === true ? (
          <Loader size="sm" />
        ) : (
          <>
            <MdCloudUpload size={30} />
            &nbsp;&nbsp; {fileName ?? 'Select file'}
          </>
        )}
      </Box>
      <Box display="none">
        <FileInput ref={inputRef} {...props} onChange={handleChange} />
      </Box>
    </Box>
  );
}
