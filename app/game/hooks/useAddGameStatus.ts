import { useEffect, useState } from 'react';

import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import useLogout from '../../auth/hooks/useLogout';
import { useTranslation } from '../../shared/config/i18next';
import { SITUATION_NAME } from '../../shared/helpers/status';
import { ADD_GAME_STATUS } from '../graphql/games';

const useAddGameStatus = (gameId: number, name: string) => {
  const { t } = useTranslation('common');
  const { push } = useRouter();
  const logout = useLogout();
  const [situation, setSituation] = useState('');
  const [addGameStatus, { data, loading }] = useMutation(ADD_GAME_STATUS, {
    onError: () => {
      toast.error(t('common:errors.something_went_wrong'));
    },
  });

  const handleAddGameStatus = (situationId) => {
    setSituation(t(SITUATION_NAME[situationId]));
    addGameStatus({
      variables: {
        gameId,
        statusId: situationId,
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
    toast.success(
      t('common:success.game_added', {
        game: name.toUpperCase(),
        situation: situation.toUpperCase(),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { handleAddGameStatus, result: data?.addStatusToGame, loading };
};

export default useAddGameStatus;
