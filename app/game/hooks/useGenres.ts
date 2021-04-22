import { useQuery } from '@apollo/client';

import { ALL_GENRES } from '../graphql/games';
import { Genre } from '../types/game';

type GenreQueryType = {
  genres: Genre[];
};

const useGenres = () => {
  const { data: genres, loading } = useQuery<GenreQueryType>(ALL_GENRES);
  return { genres: genres?.genres || [], loading };
};

export default useGenres;
