import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import reportWebVitals from './reportWebVitals';
import { Ways } from './Routes';
import { createGlobalStyle } from 'styled-components';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  credentials: "include",
});

const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgb(255, 254, 252);
  }
  *:focus {
    outline: 0;
  }
  a {
    color: #0d0d0d;
    text-decoration: none;
  }
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <React.StrictMode>
      <Ways />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
