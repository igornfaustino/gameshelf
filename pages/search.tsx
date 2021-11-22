import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import styled from 'styled-components';

import Game from '../app/game/components/Game';
import GameFilters, { FilterSubmitCallback } from '../app/game/components/GameFilters';
import GamesArea from '../app/game/components/GamesArea';
import { ALL_PLATFORMS, ALL_GENRES } from '../app/game/graphql/games';
import useGameQuery from '../app/game/hooks/useGameQuery';
import { initializeApollo } from '../app/shared/config/apolloClient';
import { useTranslation } from '../app/shared/config/i18next';
import Pagination from '../app/shared/elements/Pagination';
import When from '../app/shared/elements/When';
import usePagination from '../app/shared/hooks/usePagination';
import DashboardLayout from '../app/shared/templates/DashboardLayout';

const ControlArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  flex-direction: row;

  p {
    min-width: 100px;
    margin: 0;

    span {
      font-weight: bold;
    }
  }
`;

const Search = () => {
  const { t } = useTranslation(['common']);
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
      <ControlArea>
        <When expr={!!count}>
          <p>
            {`${t('common:total')}: `}
            <span>{count}</span>
          </p>
        </When>
        <GameFilters query={router.query.q} onSubmit={onFilterSubmit} />
      </ControlArea>

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
