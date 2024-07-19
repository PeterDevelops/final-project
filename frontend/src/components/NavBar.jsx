import React, { useState} from 'react';
import '../styles/NavBar.scss';

import HamburgerMenu from './NavBar-Components/HamburgerMenu';
import Cart from './NavBar-Components/Cart';
import Inbox from './NavBar-Components/Inbox';
import SearchBar from './NavBar-Components/SearchBar';

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <span className="nav-bar__logo">Mrkt</span>
      <div className="nav-bar__links">
      <HamburgerMenu />
      <Cart />
      <Inbox />
      <SearchBar />
      </div>
    </nav>
  );
};

export default NavBar;
