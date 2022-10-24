import { ApolloClient } from '@apollo/client';
import { createCache } from '../lib/cache';

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    headers: {
        Authorization: 'Bearer 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'
    },
    cache: createCache()
});

export default client;
