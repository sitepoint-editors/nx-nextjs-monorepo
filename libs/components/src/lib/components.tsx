import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
  font-family: sans-serif;
`;

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-gap: 24px;
`;

export const StyledCardLink = styled.a`
  text-decoration: none;
  color: #000;
`;

export const StyledCard = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background-color: #f7f7f7;
`;

export const StyledCardColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: space-between;
`;

export const StyledCardRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StyledCardThumbnailContainer = styled.div`
  object-fit: cover;

  width: 150px;
  height: 150px;
  position: relative;
`;

export const StyledCardTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export const StyledCardTagline = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;
