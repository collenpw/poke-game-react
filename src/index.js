import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import  { BrowserRouter as Router } from 'react-router-dom'

import { Auth0Provider } from '@auth0/auth0-react';

import 'bootstrap/dist/css/bootstrap.min.css';



<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
  crossorigin="anonymous"
/>


ReactDOM.render(
  <Auth0Provider
    domain='collenpw.us.auth0.com'
    clientId='eUuBo0JOfHPS6d4K7eGoQOwIxwnbLcCT'
    redirectUri='https://okie-dokie-dex.netlify.app/'
    audience="https://collenpw.us.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata">
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
