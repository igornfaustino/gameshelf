import React from 'react';

import { GameType } from '../../types/game';
import Card from './Card';
import SafeGameImage from './SafeImage';

type Props = GameType;

const Game = (props: Props) => {
  const { cover, name, thumbnail } = props;
  return (
    <Card>
      {cover && <SafeGameImage src={cover} thumb={thumbnail} />}
      {name}
    </Card>
  );
};

export default Game;
