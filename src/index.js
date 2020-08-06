import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/rootReducer';

import * as serviceWorker from './serviceWorker';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import Config from './components/Configuration';
import Battle from './components/Battle';

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});
import Routes from './components/Routes';

const store = createStore(rootReducer, composeEnhancers());

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Routes />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
