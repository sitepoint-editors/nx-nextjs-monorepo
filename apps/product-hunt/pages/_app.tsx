import { ClientContext } from 'graphql-hooks';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { useGraphQLClient } from '../lib/graphql-client';

const NextApp = ({ Component, pageProps }: AppProps) => {
  const graphQLClient = useGraphQLClient(pageProps.initialGraphQLState);

  return (
    <ClientContext.Provider value={graphQLClient}>
      <Head>
        <title>Welcome to product-hunt!</title>
      </Head>
      <Component {...pageProps} />
    </ClientContext.Provider>
  );
};

export default NextApp;
