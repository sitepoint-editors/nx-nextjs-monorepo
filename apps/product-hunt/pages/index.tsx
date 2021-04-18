import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

const StyledContainer = styled.div`
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
  font-family: sans-serif;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-gap: 24px;
`;

const StyledCardLink = styled.a`
  text-decoration: none;
  color: #000;
`;

const StyledCard = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background-color: #f7f7f7;
  border-radius: 4px;
`;

const StyledCardColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: space-between;
`;

const StyledCardRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledCardThumbnail = styled(Image)`
  object-fit: cover;
  border-radius: 4px;
`;

const StyledCardTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const StyledCardTagline = styled.div`
  font-size: 14px;
`;

const StyledCardUserDetails = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const StyledCardUserAvatar = styled(Image)`
  border-radius: 20px;
`;

const StyledCardUserName = styled.p`
  font-size: 14px;
  margin: 0;
`;

interface Product {
  id: number;
  name: string;
  tagline: string;
  slug: string;
  thumbnail: {
    image_url: string;
  };
  user: {
    avatar_url: string;
    name: string;
  };
}
interface IProps {
  hits: Product[];
}

const ProductsIndexPage: NextPage<IProps> = ({ hits }) => {
  return (
    <StyledContainer>
      <StyledGrid>
        {hits.map((product) => {
          return (
            <Link key={product.id} href={`/products/${product.slug}`} passHref>
              <StyledCardLink>
                <StyledCard>
                  <StyledCardColumn>
                    <StyledCardThumbnail
                      src={product.thumbnail.image_url}
                      width={100}
                      height={100}
                    />
                  </StyledCardColumn>
                  <StyledCardColumn>
                    <StyledCardRow>
                      <StyledCardTitle>{product.name}</StyledCardTitle>
                      <StyledCardTagline>{product.tagline}</StyledCardTagline>
                    </StyledCardRow>
                    <StyledCardRow>
                      <StyledCardUserDetails>
                        <StyledCardUserAvatar
                          src={product.user.avatar_url}
                          alt={product.user.name}
                          width={20}
                          height={20}
                        />
                        <StyledCardUserName>
                          {product.user.name}
                        </StyledCardUserName>
                      </StyledCardUserDetails>
                    </StyledCardRow>
                  </StyledCardColumn>
                </StyledCard>
              </StyledCardLink>
            </Link>
          );
        })}
      </StyledGrid>
    </StyledContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_ALGOLIA_API_ENDPOINT, {
    headers: {
      'X-Algolia-API-Key': process.env.NEXT_PUBLIC_ALGOLIA_API_KEY,
      'X-Algolia-Application-Id': process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    },
  });
  const data = await response.json();

  return {
    props: data,
  };
};

export default ProductsIndexPage;
