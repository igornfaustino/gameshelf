import { useQuery } from '@apollo/client';

import { GET_HOME_GAMES } from '../graphql/games';
import { GameType } from '../types/game';

type HomeQuery = {
  home: {
    releases: GameType[];
    popular: GameType[];
  };
};

const useHomeGames = () => {
  const { data, loading } = useQuery<HomeQuery>(GET_HOME_GAMES);

  return { popular: data.home.popular, releases: data.home.releases, loading };
};

export default useHomeGames;
