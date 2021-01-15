import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import { GameType, Platform } from '../app/types/game';
import Game from '../app/components/elements/Game';
import { SEARCH_GAME_QUERY, SEARCH_COUNT_QUERY, ALL_PLATFORMS } from '../app/graphql/games';
import DashboardLayout from '../app/components/templates/DashboardLayout';
import GamesArea from '../app/components/elements/GamesArea';
import Pagination from '../app/components/elements/Pagination';
import { initializeApollo } from '../app/config/apolloClient';
import GameFilters, { FilterSubmitCallback } from '../app/components/elements/GameFilters';

type GameQueryType = {
  game: GameType[];
};

type CountQueryType = {
  countGames: number;
};

type PlatformQueryType = {
  platforms: Platform[];
};

const Search = (props) => {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(30);
  const [platformIds, setPlatformIds] = useState<number[] | undefined>(undefined);
  const { data } = useQuery<PlatformQueryType>(ALL_PLATFORMS);
  const { loading: loadingGames, error: gamesError, data: gamesData } = useQuery<GameQueryType>(
    SEARCH_GAME_QUERY,
    {
      variables: {
        search: router.query.q,
        limit,
        offset,
        platforms: platformIds,
      },
    }
  );
  const { data: countData } = useQuery<CountQueryType>(SEARCH_COUNT_QUERY, {
    variables: {
      search: router.query.q,
      platforms: platformIds,
    },
  });

  // const options = data;
  const platformOptions = data.platforms.map((platform) => ({
    value: platform.id,
    label: platform.name,
  }));

  const onPageChange = (page: number) => {
    setOffset(limit * page);
    window.scrollTo(0, 0);
  };

  const onFilterSubmit = (values: FilterSubmitCallback) => {
    console.log(values);
    setPlatformIds(values.platforms);
  };

  console.log({ gamesData, loading: loadingGames, error: gamesError, countData });
  return (
    <DashboardLayout>
      <GameFilters platformOptions={platformOptions} onSubmit={onFilterSubmit} />
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

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_PLATFORMS,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 60,
  };
}

export default Search;
