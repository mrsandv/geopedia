import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.EXPO_PUBLIC_GRAPHQL_URI }),
  cache: new InMemoryCache(),
});
