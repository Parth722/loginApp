import React from 'react';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:3000',
    cache: new InMemoryCache(),
    connectToDevTools: true
})

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)