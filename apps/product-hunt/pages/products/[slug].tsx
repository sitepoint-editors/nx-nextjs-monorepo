import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const StyledContainer = styled.div`
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
  font-family: sans-serif;
  display: flex;
  justify-content: center;
`;

const StyledCardLink = styled.a`
  text-decoration: none;
  color: #000;
`;

const StyledCard = styled.div`
  display: inline-flex;
  gap: 12px;
  padding: 12px;
  background-color: #f7f7f7;
  border-radius: 4px;
  flex-direction: column;
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

interface IProps {
  id: number;
  name: string;
  tagline: string;
  url: string;
  thumbnail: {
    image_url: string;
  };
  user: {
    avatar_url: string;
    name: string;
  };
}

const ProductsShowPage: NextPage<IProps> = ({
  id,
  name,
  tagline,
  url,
  thumbnail,
  user,
}) => {
  return (
    <StyledContainer>
      <StyledCardLink
        key={id}
        href={`https://producthunt.com/${url}`}
        target="_blank"
      >
        <StyledCard>
          <StyledCardRow>
            <StyledCardThumbnail
              src={thumbnail.image_url}
              width={576}
              height={300}
            />
          </StyledCardRow>
          <StyledCardRow>
            <StyledCardTitle>{name}</StyledCardTitle>
            <StyledCardTagline>{tagline}</StyledCardTagline>
          </StyledCardRow>
          <StyledCardRow>
            <StyledCardUserDetails>
              <StyledCardUserAvatar
                src={user.avatar_url}
                alt={user.name}
                width={20}
                height={20}
              />
              <StyledCardUserName>{user.name}</StyledCardUserName>
            </StyledCardUserDetails>
          </StyledCardRow>
        </StyledCard>
      </StyledCardLink>
    </StyledContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ALGOLIA_API_ENDPOINT}?query=${params.slug}`,
    {
      headers: {
        'X-Algolia-API-Key': process.env.NEXT_PUBLIC_ALGOLIA_API_KEY,
        'X-Algolia-Application-Id': process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
      },
    }
  );
  const data = await response.json();

  return {
    props: data.hits[0],
  };
};

export default ProductsShowPage;
