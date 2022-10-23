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
