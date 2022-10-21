import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    headers: {
        Authorization: 'Bearer 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'
    },
    cache: new InMemoryCache(),
});

export default client;
