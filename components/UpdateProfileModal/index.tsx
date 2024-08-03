'use client';

import { useAuthMe, useUpdateUser } from '@/api/hook';
import { useAuthContext } from '@/providers/authProvider';
import { Alert, Button, Modal, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import {
  UpdateUserForm,
  UpdateUserFormLabel,
  UpdateUserFormName,
  UpdateUserFormSchema,
  getUpdateUserFormInitialValue,
} from './utils';

interface UpdateProfileModalProps {
  opened: boolean;
  onClose: () => void;
}

export function UpdateProfileModal({ onClose, opened }: UpdateProfileModalProps): JSX.Element {
  const { data: user } = useAuthMe();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { handleLogout } = useAuthContext();
  const { mutate, isPending } = useUpdateUser({
    onSuccess: handleLogout,
    onError: ({ response }) => {
      setErrorMessage(response?.data.message ?? 'Something went wrong');
    },
  });
  const { getInputProps, errors, onSubmit } = useForm<UpdateUserForm>({
    initialValues: getUpdateUserFormInitialValue(user),
    validate: zodResolver(UpdateUserFormSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const handleSubmit = (data: UpdateUserForm) => {
    console.log('Data', data);
    mutate(data);
  };

  return (
    <Modal opened={opened} onClose={onClose}>
      <form onSubmit={onSubmit(handleSubmit)}>
        <Stack>
          {typeof errorMessage === 'string' ? (
            <Alert mb={10} icon={<FaInfoCircle />} color="red">
              {errorMessage}
            </Alert>
          ) : null}
          <TextInput
            label={UpdateUserFormLabel.username}
            placeholder="Username"
            {...getInputProps(UpdateUserFormName.username)}
            error={errors[UpdateUserFormName.username]}
          />
          <TextInput
            label={UpdateUserFormLabel.newPassword}
            placeholder="password"
            {...getInputProps(UpdateUserFormName.newPassword)}
            error={errors[UpdateUserFormName.newPassword]}
          />
          <TextInput
            label={UpdateUserFormLabel.oldPassword}
            placeholder="password"
            {...getInputProps(UpdateUserFormName.oldPassword)}
            error={errors[UpdateUserFormName.oldPassword]}
          />
          <Button loading={isPending} type="submit">
            Save
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
