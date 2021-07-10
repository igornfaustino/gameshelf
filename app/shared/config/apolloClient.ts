import { useMemo } from 'react';

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

import useAuthToken from '../../auth/hooks/useAuthToken';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_SERVER_URL });

const authMiddleware = (authToken) =>
  new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    if (authToken) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });
    }

    return forward(operation);
  });

const createLink = (token) => authMiddleware(token).concat(httpLink);

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // set to true for SSR
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null, authToken = null) {
  const _apolloClient = apolloClient ?? createApolloClient();
  _apolloClient.setLink(createLink(authToken));

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState) {
  const { authToken } = useAuthToken();
  const store = useMemo(() => initializeApollo(initialState, authToken), [initialState, authToken]);
  return store;
}
