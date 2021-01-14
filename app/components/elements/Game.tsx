import React from 'react';
import styled from 'styled-components';

import { GameType } from '../../types/game';
import Card from './Card';

type Props = GameType;

const GameImage = styled.img`
  display: block;
  max-height: 100%;
  margin: auto;
  max-height: 352px;
  width: 100%;
`;

const Game = (props: Props) => {
  const { cover, name } = props;
  return (
    <Card>
      {cover && <GameImage src={cover} />}
      {name}
    </Card>
  );
};

export default Game;
