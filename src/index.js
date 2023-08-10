import ReactDOM from 'react-dom';
import React from 'react';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
// import { createRoot } from 'react-dom/client';
import "./index.css";
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));

const myDomain = `${process.env.REACT_APP_AUTH0_DOMAIN}`;
const myClientId = `${process.env.REACT_APP_AUTH0_CLIENT_ID}`;

root.render(
  <div>
    < Auth0Provider
      domain={myDomain}
      clientId={myClientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider >
  </div>
);



