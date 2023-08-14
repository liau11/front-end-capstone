import ReactDOM from 'react-dom/client';
import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const myDomain = `${process.env.REACT_APP_AUTH0_DOMAIN}`;
const myClientId = `${process.env.REACT_APP_AUTH0_CLIENT_ID}`;

root.render(
  <div>
    <Auth0Provider
      domain={myDomain}
      clientId={myClientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </div>
);
