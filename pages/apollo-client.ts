import { ApolloClient } from '@apollo/client';
import { createCache } from '../lib/cache';

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    headers: {
        Authorization: 'Bearer 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'
        //#Спросить - стоит ли держать в открытом доступе
    },
    cache: createCache()
});

export default client;
