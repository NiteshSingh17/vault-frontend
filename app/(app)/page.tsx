import { MediaTypes } from '@/schema';
import { redirect } from 'next/navigation';

export default function HomePage(): JSX.Element {
  redirect(`/${MediaTypes.Credential}`);
}
