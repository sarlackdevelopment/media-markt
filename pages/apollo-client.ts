import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    headers: {
        Authorization: 'Bearer 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'
    },
    cache: new InMemoryCache()
});

export default client;
