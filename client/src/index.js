import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.min.js";




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-2nsfwttcz7kg2xh7.us.auth0.com"
    clientId='SowaKM71v1HO2ToYCB6jTqxv7ELlh56E'
    authorizationParams={{
      redirect_uri: window.location.origin + "/profile"
    }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);