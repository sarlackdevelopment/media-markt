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
