import { useQuery } from '@apollo/client';

import { SEARCH_COUNT_QUERY, SEARCH_GAME_QUERY } from '../graphql/games';
import { GameType } from '../types/game';

type GameQueryType = {
  game: GameType[];
};

type CountQueryType = {
  countGames: number;
};

const useGameQuery = (
  search: string,
  limit: number,
  offset: number,
  platforms: number[],
  genres: number[]
) => {
  const { loading, error, data: games } = useQuery<GameQueryType>(SEARCH_GAME_QUERY, {
    variables: {
      search,
      limit,
      offset,
      platforms,
      genres,
    },
    skip: !search,
  });

  const { data: count } = useQuery<CountQueryType>(SEARCH_COUNT_QUERY, {
    variables: {
      search,
      platforms,
      genres,
    },
    skip: !search,
  });

  return { games: games?.game || [], loading, error, count: count?.countGames || 0 };
};

export default useGameQuery;
