import { gql } from '@apollo/client';

export const GET_GAME_BY_STATUS = gql`
  query gamesByStatus($statusId: Int) {
    gamesByStatus(statusId: $statusId) {
      ... on GamesByStatus {
        games {
          name
          id
          cover
          thumbnail
          genres {
            id
            name
          }
          platforms {
            id
            name
            abbreviation
          }
          status
        }
        count
      }
      ... on Unauthorized {
        reason
      }
    }
  }
`;

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
      status
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

export const REMOVE_GAME_STATUS = gql`
  mutation removeStatusToGame($gameId: ID) {
    removeStatusToGame(gameId: $gameId) {
      ... on Game {
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
        status
      }
      ... on Unauthorized {
        reason
      }
    }
  }
`;

export const ADD_GAME_STATUS = gql`
  mutation addStatusToGame($gameId: ID, $statusId: Int) {
    addStatusToGame(gameId: $gameId, statusId: $statusId) {
      ... on Game {
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
        status
      }
      ... on Unauthorized {
        reason
      }
    }
  }
`;

export const GET_HOME_GAMES = gql`
  {
    home {
      releases {
        id
        name
        cover
        thumbnail
        platforms {
          id
          name
          abbreviation
        }
        genres {
          id
          name
        }
        status
      }

      popular {
        id
        name
        cover
        thumbnail
        platforms {
          id
          name
          abbreviation
        }
        genres {
          id
          name
        }
        status
      }
    }
  }
`;
