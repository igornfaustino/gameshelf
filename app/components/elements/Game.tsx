import React, { useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { useTranslation } from '../../config/i18next';
import { REMOVE_GAME_STATUS } from '../../graphql/games';
import { GameType } from '../../types/game';
import Card from './Card';
import PacManSpinner from './PacManSpinner';
import SafeGameImage from './SafeImage';
import When from './When';

const StatusIndicator = styled.div`
  position: absolute;
  right: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 8px 8px 8px 16px;
  border-radius: 0px 0px 0px 15px;
  display: flex;
  align-items: center;
`;

const RemoveBtn = styled.span`
  ::after {
    content: 'X';
  }
  margin-right: 8px;
  cursor: pointer;
  border-right: #fff solid 1px;
  padding-right: 8px;

  :hover {
    color: #777;
  }
`;

type Props = GameType;

const Game = (props: Props) => {
  const { cover, name, thumbnail, status, id } = props;
  const { t } = useTranslation('common');
  const [removeGameStatus, { data, loading }] = useMutation(REMOVE_GAME_STATUS, {
    onError: (error) => {
      console.log({ error });
      toast.error(t('common:errors.something_went_wrong'));
    },
  });

  const handleRemoveBtn = () => removeGameStatus({ variables: { gameId: id } });

  useEffect(() => {
    if (!data || !data.removeStatusToGame) return;
    toast.success(t('common:success.game_removed'));
  }, [data, t]);

  return (
    <Card>
      <When expr={!!status}>
        <StatusIndicator>
          <When expr={!loading}>
            <RemoveBtn onClick={handleRemoveBtn} />
            {t(`common:${status}`)}
          </When>
          <When expr={loading}>
            <PacManSpinner size="1.3rem" />
          </When>
        </StatusIndicator>
      </When>
      <When expr={!!cover}>
        <SafeGameImage src={cover} thumb={thumbnail} />
      </When>
      {name}
    </Card>
  );
};

export default Game;
