const ALL_POSTS_QUERY = `
  query allPosts {
    posts {
      edges {
        node {
          id
          name
          description
          votesCount
          website
          thumbnail {
            url
          }
        }
      }
    }
  }
`;

export default ALL_POSTS_QUERY;
