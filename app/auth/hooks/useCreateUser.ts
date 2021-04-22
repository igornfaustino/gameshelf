import { useCallback, useEffect } from 'react';

import { useApolloClient, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useTranslation } from '../../shared/config/i18next';
import { CREATE_USER } from '../graphql/user';
import useAuthToken from './useAuthToken';

const useCreateAndAuthUser = () => {
  const router = useRouter();
  const client = useApolloClient();
  const { saveToken } = useAuthToken();
  const { t } = useTranslation(['common']);
  const [createAndAuthUser, { data }] = useMutation(CREATE_USER, {
    onError: () => {
      toast.error(t('common:errors.something_went_wrong'));
    },
  });

  const authUser = useCallback(
    (token) => {
      saveToken(token);
      toast.success(t('common:user created'));
      client.cache.reset().then(() => {
        router.push('/');
      });
    },
    [client.cache, router, saveToken, t]
  );

  const handleCreateAndAuthUser = (user) => createAndAuthUser({ variables: { ...user } });

  useEffect(() => {
    if (!data || !data.createUser) return;
    if (data.createUser.__typename === 'Authorized') {
      authUser(data.createUser.token);
      return;
    }
    if (data.createUser.__typename === 'Unauthorized') {
      toast.error(t(`common:errors.${data.createUser.reason}`));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, t]);

  return handleCreateAndAuthUser;
};

export default useCreateAndAuthUser;
