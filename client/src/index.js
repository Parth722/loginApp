import React from 'react';
import ReactDom from 'react-dom';
import ApolloProvider from './components/ApolloProvider';
import maincss from './css/main.css';

document.querySelector('body').classList = 'p-0 m-0 bg-gradient-to-r from-blue-600 to-purple-700';
ReactDom.render(ApolloProvider, document.querySelector('#root'));