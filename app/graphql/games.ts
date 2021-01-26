import { gql } from '@apollo/client';

export const SEARCH_GAME_QUERY = gql`
  query game($search: String!, $platforms: [Int], $genres: [Int], $limit: Int, $offset: Int) {
    game(search: $search, platforms: $platforms, genres: $genres, limit: $limit, offset: $offset) {
      id
      name
      cover
      thumbnail
      genres {
        id
        name
      }
      platforms {
        abbreviation
        name
        id
      }
    }
  }
`;

export const SEARCH_COUNT_QUERY = gql`
  query countGames($search: String!, $platforms: [Int], $genres: [Int]) {
    countGames(search: $search, platforms: $platforms, genres: $genres)
  }
`;

export const ALL_PLATFORMS = gql`
  query platforms {
    platforms {
      id
      name
      abbreviation
    }
  }
`;

export const ALL_GENRES = gql`
  query platforms {
    genres {
      id
      name
    }
  }
`;
