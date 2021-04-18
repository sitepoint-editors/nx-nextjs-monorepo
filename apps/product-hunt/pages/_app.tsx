import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';

const StyledNavbar = styled.div`
  font-family: sans-serif;
  background-color: #f7f7f7;
  border-radius: 4px;
`;

const StyledNavbarContainer = styled.div`
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  font-family: sans-serif;
`;

const StyledNavbarLink = styled.a`
  text-decoration: none;
  color: #000;
  padding: 12px 0;
`;

const NextApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Welcome to product-hunt!</title>
      </Head>
      <StyledNavbar>
        <StyledNavbarContainer>
          <Link href="/" passHref>
            <StyledNavbarLink>All products</StyledNavbarLink>
          </Link>
        </StyledNavbarContainer>
      </StyledNavbar>
      <Component {...pageProps} />
    </>
  );
};

export default NextApp;
