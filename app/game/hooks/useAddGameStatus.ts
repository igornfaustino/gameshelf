import { useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import useLogout from '../../auth/hooks/useLogout';
import { useTranslation } from '../../shared/config/i18next';
import { ADD_GAME_STATUS } from '../graphql/games';

const useAddGameStatus = (gameId) => {
  const { t } = useTranslation('common');
  const { push } = useRouter();
  const logout = useLogout();
  const [addGameStatus, { data, loading }] = useMutation(ADD_GAME_STATUS, {
    onError: () => {
      toast.error(t('common:errors.something_went_wrong'));
    },
  });

  const handleAddGameStatus = (statusId) => () => {
    addGameStatus({
      variables: {
        gameId,
        statusId,
      },
    });
  };

  useEffect(() => {
    if (!data || !data.addStatusToGame) return;
    if (data.addStatusToGame.__typename === 'Unauthorized') {
      logout().then(() => {
        toast.error(t(`common:errors.${data.addStatusToGame.reason}`));
        push('/login');
      });
      return;
    }
    toast.success(t('common:success.game_added'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { handleAddGameStatus, data, loading };
};

export default useAddGameStatus;
