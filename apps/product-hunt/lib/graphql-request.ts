const defaultOpts = {
  useCache: true,
};

// Returns the result of a GraphQL query. It also adds the result to the
// cache of the GraphQL client for better initial data population in pages.

// Note: This helper tries to imitate what the query hooks of `graphql-hooks`
// do internally to make sure we generate the same cache key
const graphQLRequest = async (client, query, options = defaultOpts) => {
  const operation = {
    query,
  };
  const cacheKey = client.getCacheKey(operation, options);
  const cacheValue = await client.request(operation, options);

  client.saveCache(cacheKey, cacheValue);

  return cacheValue;
};

export default graphQLRequest;
