import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router , Route} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

import Config from './components/Configuration'
import Battle from './components/Battle'

const TOPICS = ['Histoire', 'Cinéma', 'Bande dessiné', 'Series US'];
const PLAYERS = ['Batman', 'Catwoman', 'Superman', 'Supergirl'];
const initialState = {
    topics: TOPICS,
    players: PLAYERS,
    selectedTopics: []
};

const globalStateContext = React.createContext(initialState);
ReactDOM.render(
  <globalStateContext.Provider value={initialState}>
    <React.StrictMode>
      <Router>
        <Route path="/" exact strict component={App}></Route>
        <Route path="/config" exact strict component={Config}></Route>
        <Route path="/battle" exact strict component={Battle}></Route>
      </Router>
    </React.StrictMode>
  </globalStateContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
