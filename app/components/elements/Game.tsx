import React, { useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { useTranslation } from '../../config/i18next';
import { REMOVE_GAME_STATUS } from '../../graphql/games';
import { GameType } from '../../types/game';
import Button from './Button';
import Card from './Card';
import PacManSpinner from './PacManSpinner';
import PlatformIndicator from './PlatformIndicator';
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

const GameName = styled.p`
  margin: 0;
  overflow: hidden;
  line-height: 1rem;
  height: 2rem;
  margin-bottom: 8px;
  font-size: 1rem;
  text-overflow: ellipsis;
`;

type Props = GameType;

const Game = (props: Props) => {
  const { cover, name, thumbnail, status, id, platforms } = props;
  const { t } = useTranslation('common');
  const [removeGameStatus, { data, loading }] = useMutation(REMOVE_GAME_STATUS, {
    onError: () => {
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
      <SafeGameImage src={cover} thumb={thumbnail} />
      <GameName>{name}</GameName>
      <PlatformIndicator platforms={platforms} />
      <When expr={!!status}>
        <Button white textVariant="primary">
          {t(`common:add`)}
        </Button>
      </When>
      <When expr={!status}>
        <Button textVariant="light">{t(`common:add`)}</Button>
      </When>
    </Card>
  );
};

export default Game;
