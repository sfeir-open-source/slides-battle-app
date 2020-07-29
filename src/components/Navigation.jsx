import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';

import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import GamesIcon from '@material-ui/icons/Games';

function Navigation() {
    return (
        <div className="App">
            <div  className="App-content home">
                <Link to="/config" className="btn btn-primary mb-4">
                    <IconButton
                        aria-label="configuration"
                        title="link to configuration"> <SettingsIcon className="mr-3" /> Configuration
                    </IconButton>
                </Link>
                <Link to="/battle" className="btn btn-primary">
                <IconButton
                        aria-label="configuration"
                        title="link to configuration"> <GamesIcon className="mr-3" /> Battle
                    </IconButton>
                </Link>
            </div>
        </div>
    )
}

export default Navigation;