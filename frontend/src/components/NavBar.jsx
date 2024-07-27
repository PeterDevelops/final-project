import React, { useState} from 'react';
import '../styles/NavBar.scss';

import HamburgerMenu from './NavBar-Components/HamburgerMenu';
import Cart from './NavBar-Components/Cart';
import Inbox from './NavBar-Components/Inbox';
import SearchBar from './NavBar-Components/SearchBar';

const NavBar = () => {
  return (
    <div>
      <nav className="nav-bar">
          <HamburgerMenu />
        <span className="nav-bar__logo">Mrkt</span>
        <div className="nav-bar__links">
          <Cart />
          <Inbox />
        </div>
      </nav>
      <div className="search-bar-container">
        <SearchBar />
      </div>
    </div>
  );
};

export default NavBar;
