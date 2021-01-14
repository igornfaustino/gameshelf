import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import { GameType } from '../app/types/game';
import Game from '../app/components/elements/Game';
import { SEARCH_GAME_QUERY, SEARCH_COUNT_QUERY } from '../app/graphql/games';
import DashboardLayout from '../app/components/templates/DashboardLayout';
import GamesArea from '../app/components/elements/GamesArea';
import Pagination from '../app/components/elements/Pagination';

type GameQueyType = {
  game: GameType[];
};

type CountQueyType = {
  countGames: number;
};

const Search = (props) => {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(30);
  const { loading: loadingGames, error: gamesError, data: gamesData } = useQuery<GameQueyType>(
    SEARCH_GAME_QUERY,
    {
      variables: {
        search: router.query.q,
        limit,
        offset,
      },
    }
  );
  const { data: countData } = useQuery<CountQueyType>(SEARCH_COUNT_QUERY, {
    variables: {
      search: router.query.q,
    },
  });

  const onPageChange = (page: number) => {
    setOffset(limit * page);
    window.scrollTo(0, 0);
  };

  console.log({ gamesData, loading: loadingGames, error: gamesError, countData });
  return (
    <DashboardLayout>
      <h1>search {router.query.q}</h1>
      <GamesArea>
        {gamesData?.game?.map((game) => (
          <Game key={game.id} {...game} />
        ))}
      </GamesArea>
      <Pagination
        total={countData?.countGames}
        offset={offset}
        limit={limit}
        onPageChange={onPageChange}
      />
    </DashboardLayout>
  );
};

export default Search;
