'use client';

import '@mantine/tiptap/styles.css';
import dynamic from 'next/dynamic';

export interface TinyEditorProps {
  preview?: boolean;
  initialValue?: string;
  onChange?: (htmlContent: string) => void;
}
const EditorX = dynamic(() => import('./Editor'), { ssr: false });

export default function TinyEditor({ initialValue, onChange, preview }: TinyEditorProps) {
  return <EditorX value={initialValue ?? ''} onChange={onChange} preview={preview} />;
}
