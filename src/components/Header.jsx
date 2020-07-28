import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import HomeIcon from '@material-ui/icons/Home';

function Header() {
    const backToHome = <Link to="/" className="btn btn-outline-secondary" > <HomeIcon /> </Link>

    return (
        <div className="Header">
            <div className="col-md-1">{backToHome}</div>
            <h1 className="col-md-11 text-center">Slide Battle</h1>
        </div>
    )
}

export default Header;