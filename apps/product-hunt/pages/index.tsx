import { useQuery } from 'graphql-hooks';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import React from 'react';
import { initializeGraphQL } from '../lib/graphql-client';
import graphQLRequest from '../lib/graphql-request';
import {
  StyledCard,
  StyledCardColumn,
  StyledCardLink,
  StyledCardRow,
  StyledCardTagline,
  StyledCardThumbnailContainer,
  StyledCardTitle,
  StyledContainer,
  StyledGrid,
} from '../public/styles';
import ALL_POSTS_QUERY from '../queries/all-posts';
import Product from '../types/product';

interface IProps {
  hits: Product[];
}

const ProductsIndexPage: NextPage<IProps> = () => {
  const { data } = useQuery(ALL_POSTS_QUERY);

  return (
    <StyledContainer>
      <StyledGrid>
        {data.posts.edges.map(({ node }) => {
          return (
            <StyledCardLink key={node.id} href={node.website} target="_blank">
              <StyledCard>
                <StyledCardColumn>
                  <StyledCardThumbnailContainer>
                    <Image src={node.thumbnail.url} layout="fill" />
                  </StyledCardThumbnailContainer>
                </StyledCardColumn>
                <StyledCardColumn>
                  <StyledCardRow>
                    <StyledCardTitle>{node.name}</StyledCardTitle>
                    <StyledCardTagline>{node.description}</StyledCardTagline>
                  </StyledCardRow>
                </StyledCardColumn>
              </StyledCard>
            </StyledCardLink>
          );
        })}
      </StyledGrid>
    </StyledContainer>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const client = initializeGraphQL();

  await graphQLRequest(client, ALL_POSTS_QUERY);

  return {
    props: {
      initialGraphQLState: client.cache.getInitialState(),
    },
    revalidate: 60,
  };
};

export default ProductsIndexPage;
