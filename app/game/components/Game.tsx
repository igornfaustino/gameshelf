import React, { useState } from 'react';

import styled from 'styled-components';

import { useTranslation } from '../../shared/config/i18next';
import Button from '../../shared/elements/Button';
import Card from '../../shared/elements/Card';
import PacManSpinner from '../../shared/elements/PacManSpinner';
import PlatformIndicator from '../../shared/elements/PlatformIndicator';
import SafeGameImage from '../../shared/elements/SafeImage';
import When from '../../shared/elements/When';
import useRemoveGameStatus from '../hooks/useRemoveGameStatus';
import { GameType } from '../types/game';
import AddGameToListModal from './AddGameToListModal';

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
  margin-top: 4px;
  overflow: hidden;
  line-height: 1rem;
  height: 2rem;
  margin-bottom: 8px;
  font-size: 1rem;
  text-overflow: ellipsis;
`;

type Props = GameType & { ssr?: boolean };

const Game = (props: Props) => {
  const { cover, name, thumbnail, status, id, platforms, ssr } = props;

  const { handleRemoveGameStatus, loading } = useRemoveGameStatus(id);

  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Card>
        <When expr={!!status}>
          <StatusIndicator>
            <When expr={!loading}>
              <RemoveBtn onClick={handleRemoveGameStatus} />
              {t(`common:${status}`)}
            </When>
            <When expr={loading}>
              <PacManSpinner size="1.3rem" />
            </When>
          </StatusIndicator>
        </When>
        <SafeGameImage src={cover} thumb={thumbnail} ssr={ssr} />
        <GameName>{name}</GameName>
        <PlatformIndicator platforms={platforms} />
        <When expr={!!status}>
          <Button white textVariant="primary" bordered onClick={() => setIsVisible(true)}>
            {t(`common:add`)}
          </Button>
        </When>
        <When expr={!status}>
          <Button textVariant="light" onClick={() => setIsVisible(true)}>
            {t(`common:add`)}
          </Button>
        </When>
      </Card>
      <AddGameToListModal
        visible={isVisible}
        setVisible={setIsVisible}
        gameId={id}
        name={name}
        status={status}
      />
    </>
  );
};

export default Game;
