import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { Stack } from 'expo-router';

export const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.GRAPHQL_URI }),
  cache: new InMemoryCache(),
});

const RootLayout = () => {
  return (
    <ApolloProvider client={client}>
      <Stack />
    </ApolloProvider>
  )
}

export default RootLayout;