import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Client from 'shopify-buy';

const client = Client.buildClient({
  storefrontAccessToken: 'df6fc859931d69c4b8a6d2fbb6ea2286',
  domain: 'dime-beauty-demo.myshopify.com'
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App shopifyClient={client} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
