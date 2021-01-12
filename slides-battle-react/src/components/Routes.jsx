import { BrowserRouter as Router , Route} from 'react-router-dom';

import React from 'react';

import App from '../App'
import Config from './Configuration'
import Battle from './Battle'

class Routes extends React.Component {
    render() {
        return(
            <Router>
                <Route path="/" exact strict component={App}></Route>
                <Route path="/config" exact strict component={Config}></Route>
                <Route path="/battle" exact strict component={Battle}></Route>
            </Router>
        )
    }
}

export default Routes;

