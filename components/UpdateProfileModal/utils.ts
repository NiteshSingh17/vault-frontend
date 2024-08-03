import { User } from '@/schema';
import z from 'zod';

export const UpdateUserFormSchema = z.object({
  username: z.string().min(1),
  newPassword: z.string().min(6),
  oldPassword: z.string(),
});

export type UpdateUserForm = z.infer<typeof UpdateUserFormSchema>;

export const UpdateUserFormLabel: Record<keyof UpdateUserForm, string> = {
  username: 'Username',
  newPassword: 'New password',
  oldPassword: 'Old password',
};

export const UpdateUserFormName: Record<keyof UpdateUserForm, keyof UpdateUserForm> = {
  username: 'username',
  newPassword: 'newPassword',
  oldPassword: 'oldPassword',
};

export function getUpdateUserFormInitialValue(defaultData?: User): UpdateUserForm {
  return {
    newPassword: '',
    username: defaultData?.username ?? '',
    oldPassword: '',
  };
}
