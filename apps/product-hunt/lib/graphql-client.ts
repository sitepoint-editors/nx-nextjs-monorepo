import { GraphQLClient } from 'graphql-hooks';
import memCache from 'graphql-hooks-memcache';
import { useMemo } from 'react';

let graphQLClient;

const createClient = (initialState) => {
  return new GraphQLClient({
    ssrMode: typeof window === 'undefined',
    url: process.env.NEXT_PUBLIC_PH_API_ENDPOINT, // Server URL (must be absolute)
    cache: memCache({ initialState }),
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PH_TOKEN}`,
    },
  });
};

export const initializeGraphQL = (initialState = null) => {
  const _graphQLClient = graphQLClient ?? createClient(initialState);

  // After navigating to a page with an initial GraphQL state, create a new
  // cache with the current state merged with the incoming state and set it to
  // the GraphQL client. This is necessary because the initial state of
  // `memCache` can only be set once
  if (initialState && graphQLClient) {
    graphQLClient.cache = memCache({
      initialState: Object.assign(
        graphQLClient.cache.getInitialState(),
        initialState
      ),
    });
  }

  // For SSG and SSR always create a new GraphQL Client
  if (typeof window === 'undefined') {
    return _graphQLClient;
  }

  // Create the GraphQL Client once in the client
  if (!graphQLClient) {
    graphQLClient = _graphQLClient;
  }

  return _graphQLClient;
};

export const useGraphQLClient = (initialState) => {
  const store = useMemo(() => initializeGraphQL(initialState), [initialState]);

  return store;
};
