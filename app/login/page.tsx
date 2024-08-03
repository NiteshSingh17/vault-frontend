'use client';

import { Routes } from '@/api';
import { useAuthMe, useLogin } from '@/api/hook';
import { setAuthorizationHeader } from '@/api/utils';
import {
  Alert,
  Button,
  Checkbox,
  Divider,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLocalStorage } from '@mantine/hooks';
import { QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import classes from './auth.module.css';

const MAX_LOGIN_IMAGES = 3;

export default function Login(): JSX.Element {
  const router = useRouter();
  const queryClient = new QueryClient();
  const { refetch } = useAuthMe(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [, setAuthToken] = useLocalStorage({
    key: 'token',
  });
  const { values, onSubmit, getInputProps, setFieldValue } = useForm({
    initialValues: {
      username: '',
      password: '',
      rememberMe: true,
    },
  });
  const { mutate: login, isPending } = useLogin({
    onSuccess: async ({ data }) => {
      if (values.rememberMe === true) setAuthToken(data.token);
      setAuthorizationHeader(data.token);
      await queryClient.invalidateQueries({
        queryKey: [Routes.AuthMe],
      });
      refetch();
      router.push('/');
    },
    onError: ({ response }) => {
      setErrorMessage(response?.data.message ?? 'Something went wrong');
    },
  });

  const handleSubmit = (data: { username: string; password: string }) => {
    login(data);
  };

  const backgroundImage = useMemo(
    () => `/login/${(Math.ceil(Math.random() * 10) % MAX_LOGIN_IMAGES) + 1}.jpg`,
    []
  );

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <div className={classes.wrapper} style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Paper className={classes.form} radius={0} px={30} py={30}>
          {/* <Box pos="absolute" top={0} left={0} w="100%" h="100%" bg="red" /> */}
          <Stack>
            <Title order={2} className={classes.title} ta="center" mt="md">
              Welcome back!
            </Title>
            <Divider my={20} />
            {typeof errorMessage === 'string' ? (
              <Alert mb={10} icon={<FaInfoCircle />} color="red">
                {errorMessage}
              </Alert>
            ) : null}
            <TextInput
              label="Username"
              placeholder="hello@gmail.com"
              size="md"
              {...getInputProps('username')}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              size="md"
              {...getInputProps('password')}
            />
            <Checkbox
              label="Remember on this device"
              mt={10}
              checked={values.rememberMe}
              onChange={(e) => setFieldValue('rememberMe', e.target.checked)}
            />
            <Button loading={isPending} type="submit" fullWidth mt="xl" size="md">
              Login
            </Button>
          </Stack>
        </Paper>
      </div>
    </form>
  );
}
