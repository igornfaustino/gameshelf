import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Game from '../app/game/components/Game';
import GameFilters, { FilterSubmitCallback } from '../app/game/components/GameFilters';
import GamesArea from '../app/game/components/GamesArea';
import { ALL_PLATFORMS, ALL_GENRES } from '../app/game/graphql/games';
import useGameQuery from '../app/game/hooks/useGameQuery';
import { initializeApollo } from '../app/shared/config/apolloClient';
import Pagination from '../app/shared/elements/Pagination';
import usePagination from '../app/shared/hooks/usePagination';
import DashboardLayout from '../app/shared/templates/DashboardLayout';

const Search = (props) => {
  const router = useRouter();
  const { limit, offset, onPageChange, resetOffset } = usePagination();

  const [platformIds, setPlatformIds] = useState<number[] | undefined>(undefined);
  const [genreIds, setGenreIds] = useState<number[] | undefined>(undefined);

  const { loading: loadingGames, games, count } = useGameQuery(
    router.query.q as string,
    limit,
    offset,
    platformIds,
    genreIds
  );

  const onFilterSubmit = (values: FilterSubmitCallback) => {
    setPlatformIds(values.platforms);
    setGenreIds(values.genres);
  };

  useEffect(() => {
    resetOffset();
    setGenreIds(undefined);
    setPlatformIds(undefined);
  }, [resetOffset, router.query.q]);

  return (
    <DashboardLayout>
      <GameFilters query={router.query.q} onSubmit={onFilterSubmit} />

      <br />

      <GamesArea loading={loadingGames} limit={limit}>
        {games?.map((game) => (
          <Game key={game.id} {...game} />
        ))}
      </GamesArea>
      <Pagination total={count} offset={offset} limit={limit} onPageChange={onPageChange} />
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
