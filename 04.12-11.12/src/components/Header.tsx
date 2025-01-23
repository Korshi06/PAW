import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/categories">Categories</Link></li>
                    <li><Link to="/postList">Post list</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;