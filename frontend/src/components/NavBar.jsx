import React, { useState} from 'react';
import '../styles/NavBar.scss';

import HamburgerMenu from './NavBar-Components/HamburgerMenu';
import Cart from './NavBar-Components/Cart';
import Inbox from './NavBar-Components/Inbox';
import SearchBar from './NavBar-Components/SearchBar';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (

    <div>
      <nav className="nav-bar">
          <HamburgerMenu />
        <span className="nav-bar__logo">Mrkt</span>
        <div className="nav-bar__links">

          <Link to="/cart">Cart</Link>
          <Link to="/inbox">Inbox</Link>

        </div>
      </nav>
      <div className="search-bar-container">
        <SearchBar />
      </div>
    </div>


  );
};

export default NavBar;
