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
