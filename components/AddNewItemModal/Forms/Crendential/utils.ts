import { Credential, Media, credentialSchema } from '@/schema';
import z from 'zod';

export const CredentialFormSchema = credentialSchema.extend({
  title: z.string().min(1),
  description: z.string().nullish(),
});

export type CreateCredentialForm = z.infer<typeof CredentialFormSchema>;

export const CredentialFormLabel: Record<keyof CreateCredentialForm, string> = {
  title: 'Title',
  username: 'Username',
  password: 'Password',
  url: 'URL',
  description: 'Description',
};

export const CredentialFormName: Record<keyof CreateCredentialForm, keyof CreateCredentialForm> = {
  title: 'title',
  username: 'username',
  password: 'password',
  url: 'url',
  description: 'description',
};

export function getCredentialFormInitialValue(defaultData?: Media): CreateCredentialForm {
  const mediaContent = defaultData?.content as Credential | undefined;
  return {
    password: mediaContent?.password ?? '',
    description: defaultData?.description ?? null,
    title: defaultData?.title ?? '',
    url: mediaContent?.url ?? '',
    username: mediaContent?.username ?? '',
  };
}
