import { useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import useLogout from '../../auth/hooks/useLogout';
import { useTranslation } from '../../shared/config/i18next';
import { REMOVE_GAME_STATUS } from '../graphql/games';

const useRemoveGameStatus = (gameId: number, name: string) => {
  const { push } = useRouter();
  const logout = useLogout();
  const { t } = useTranslation('common');
  const [removeGameStatus, { data, loading }] = useMutation(REMOVE_GAME_STATUS, {
    onError: () => {
      toast.error(t('common:errors.something_went_wrong'));
    },
  });

  const handleRemoveGameStatus = () => removeGameStatus({ variables: { gameId } });

  useEffect(() => {
    if (!data || !data.removeStatusToGame) return;
    if (data.removeStatusToGame.__typename === 'Unauthorized') {
      logout().then(() => {
        toast.error(t(`common:errors.${data.removeStatusToGame.reason}`));
        push('/login');
      });
      return;
    }
    toast.success(t('common:success.game_removed', { game: name.toUpperCase() }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { handleRemoveGameStatus, result: data?.removeStatusToGame, loading };
};

export default useRemoveGameStatus;
