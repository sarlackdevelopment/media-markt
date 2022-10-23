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
