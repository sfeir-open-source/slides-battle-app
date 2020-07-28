import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';

function Navigation() {
    return (
        <div className="App">
            <div  className="App-content">
                <Link to="/config" className="btn btn-primary mb-2"> Configuration </Link>
                <Link to="/battle" className="btn btn-primary"> Battle </Link>
            </div>
        </div>
    )
}

export default Navigation;