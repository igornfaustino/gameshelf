import { useCallback, useEffect } from 'react';

import { useApolloClient, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useTranslation } from '../../shared/config/i18next';
import { LOGIN } from '../graphql/user';
import useAuthToken from './useAuthToken';

const useLogin = () => {
  const { t } = useTranslation(['pagetitles', 'common', 'forms']);
  const { saveToken } = useAuthToken();
  const router = useRouter();
  const client = useApolloClient();
  const [login, { data }] = useMutation(LOGIN, {
    onError: () => {
      toast.error(t('common:errors.something_went_wrong'));
    },
  });

  const handleLogin = (values) => login({ variables: { ...values } });

  const authUser = useCallback(
    (token) => {
      saveToken(token);
      client.cache.reset().then(() => {
        router.push('/');
      });
    },
    [client.cache, router, saveToken]
  );

  useEffect(() => {
    if (!data || !data.login) return;
    if (data.login.__typename === 'Authorized') {
      authUser(data.login.token);
      return;
    }
    if (data.login.__typename === 'Unauthorized') {
      toast.error(t(`common:errors.${data.login.reason}`));
    }
  }, [authUser, data, t]);

  return { login: handleLogin, data };
};

export default useLogin;
