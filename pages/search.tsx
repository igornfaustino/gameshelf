import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import { GameType, Platform, Genre } from '../app/types/game';
import Game from '../app/components/elements/Game';
import {
  SEARCH_GAME_QUERY,
  SEARCH_COUNT_QUERY,
  ALL_PLATFORMS,
  ALL_GENRES,
} from '../app/graphql/games';
import DashboardLayout from '../app/components/templates/DashboardLayout';
import GamesArea from '../app/components/elements/GamesArea';
import Pagination from '../app/components/elements/Pagination';
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

type GenreQueryType = {
  genres: Genre[];
};

const Search = (props) => {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(30);
  const [platformIds, setPlatformIds] = useState<number[] | undefined>(undefined);
  const [genreIds, setGenreIds] = useState<number[] | undefined>(undefined);
  const { data: platforms } = useQuery<PlatformQueryType>(ALL_PLATFORMS);
  const { data: genres } = useQuery<GenreQueryType>(ALL_GENRES);
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
    }
  );
  const { data: countData } = useQuery<CountQueryType>(SEARCH_COUNT_QUERY, {
    variables: {
      search: router.query.q,
      platforms: platformIds,
      genres: genreIds,
    },
  });

  const platformOptions = platforms?.platforms.map((platform) => ({
    value: platform.id,
    label: platform.name,
  }));

  const genreOptions = genres?.genres.map((genre) => ({
    value: genre.id,
    label: genre.name,
  }));

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

  console.log({ gamesData, loading: loadingGames, error: gamesError, countData });
  return (
    <DashboardLayout>
      <GameFilters
        query={router.query.q}
        platformOptions={platformOptions}
        genreOptions={genreOptions}
        onSubmit={onFilterSubmit}
      />
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
