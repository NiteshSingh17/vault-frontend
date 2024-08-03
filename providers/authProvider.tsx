'use client';

import { AxiosInstance } from '@/api';
import { useAuthMe } from '@/api/hook';
import { removeAuthorizationHeader, setAuthorizationHeader } from '@/api/utils';
import { ScreenLoader } from '@/components/ScreenLoader';
import { ViewTypes } from '@/schema';
import { readLocalStorageValue, useLocalStorage } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from 'axios';
import { useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface AuthContext {
  /* add keys */
  viewType: ViewTypes;
  setViewType: (type: ViewTypes) => void;
  handleLogout: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const AuthContext = createContext<AuthContext | undefined>(undefined);

export function useAuthContext(): AuthContext {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: React.PropsWithChildren): JSX.Element {
  const router = useRouter();
  const [viewType, setViewType] = useState<ViewTypes>(ViewTypes.List);
  const { isFetching: isPending, refetch } = useAuthMe(false);
  const queryClient = useQueryClient();
  const [, , removeLocalAuthToken] = useLocalStorage({
    key: 'token',
  });

  const handleLogout = useCallback(() => {
    removeLocalAuthToken();
    removeAuthorizationHeader();
    router.push('/login');
    queryClient.clear(); // Ref https://tanstack.com/query/v4/docs/reference/QueryClient#queryclientclear
  }, [router, queryClient, removeLocalAuthToken]);

  const value: AuthContext = useMemo(
    () => ({
      handleLogout,
      setViewType,
      viewType,
    }),
    [handleLogout, setViewType, viewType]
  );

  useEffect(() => {
    // When an unauthenticated response is returned from the backend, the user should be logged out from the frontend
    // Ref: https://axios-http.com/docs/interceptors
    const logoutInterceptor = AxiosInstance.interceptors.response.use(null, (error: AxiosError) => {
      const statusCode = error.response?.status;
      if (statusCode === HttpStatusCode.Unauthorized) {
        handleLogout();
      }
      return Promise.reject(error);
    });
    return () => {
      AxiosInstance.interceptors.request.eject(logoutInterceptor);
    };
  }, [handleLogout]);

  useEffect(() => {
    const getUserDetails = async () => {
      const authToken = readLocalStorageValue<string | undefined>({
        key: 'token',
      });
      if (typeof authToken === 'string') {
        setAuthorizationHeader(authToken);
        const { isError } = await refetch();
        if (isError === true) {
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    };
    getUserDetails().catch(console.log);
  }, [router, refetch]);

  return (
    <AuthContext.Provider value={value}>
      <div style={{ height: '100vh' }}>
        <ScreenLoader isLoading={isPending}>{children}</ScreenLoader>
      </div>
    </AuthContext.Provider>
  );
}
