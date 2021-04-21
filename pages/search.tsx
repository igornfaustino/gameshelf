import React, { useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import Game from '../app/game/components/Game';
import GameFilters, { FilterSubmitCallback } from '../app/game/components/GameFilters';
import GamesArea from '../app/game/components/GamesArea';
import {
  SEARCH_GAME_QUERY,
  SEARCH_COUNT_QUERY,
  ALL_PLATFORMS,
  ALL_GENRES,
} from '../app/game/graphql/games';
import { GameType } from '../app/game/types/game';
import { initializeApollo } from '../app/shared/config/apolloClient';
import Pagination from '../app/shared/elements/Pagination';
import DashboardLayout from '../app/shared/templates/DashboardLayout';

type GameQueryType = {
  game: GameType[];
};

type CountQueryType = {
  countGames: number;
};

const Search = (props) => {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(30);
  const [platformIds, setPlatformIds] = useState<number[] | undefined>(undefined);
  const [genreIds, setGenreIds] = useState<number[] | undefined>(undefined);

  const { loading: loadingGames, error: gamesError, data: gamesData } = useQuery<GameQueryType>(
    SEARCH_GAME_QUERY,
    {
      variables: {
        search: router.query.q,
        limit,
        offset,
        platforms: platformIds,
        genres: genreIds,
      },
      skip: !router.query.q,
    }
  );
  const { data: countData } = useQuery<CountQueryType>(SEARCH_COUNT_QUERY, {
    variables: {
      search: router.query.q,
      platforms: platformIds,
      genres: genreIds,
    },
    skip: !router.query.q,
  });

  const onPageChange = (page: number) => {
    setOffset(limit * page);
    window.scrollTo(0, 0);
  };

  const onFilterSubmit = (values: FilterSubmitCallback) => {
    setPlatformIds(values.platforms);
    setGenreIds(values.genres);
  };

  useEffect(() => {
    setOffset(0);
    setGenreIds(undefined);
    setPlatformIds(undefined);
  }, [router.query.q]);

  return (
    <DashboardLayout>
      <GameFilters query={router.query.q} onSubmit={onFilterSubmit} />

      <br />

      <GamesArea loading={loadingGames} limit={limit}>
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

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_PLATFORMS,
  });

  await apolloClient.query({
    query: ALL_GENRES,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 60,
  };
}

export default Search;
