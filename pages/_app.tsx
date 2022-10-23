import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';
import { BoundaryErrorsAPI } from '../components/BoundaryErrorsAPI';

function MyApp({ Component, pageProps }: AppProps) {
    return (<>
        <BoundaryErrorsAPI />
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    </>);
}

export default MyApp;
