import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from './redux/reducers';
import { initialize } from './redux/reducers/categoryReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');


store.dispatch(initialize(window.location.pathname.slice(1)));


root.render(
  <Provider store={store}>
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>
  </Provider>
);


