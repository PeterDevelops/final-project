import React from 'react';

import HamburgerMenu from './NavBar-Components/HamburgerMenu';
import Cart from './NavBar-Components/Cart';
import Inbox from './NavBar-Components/Inbox';
import SearchBar from './NavBar-Components/SearchBar';

const NavBar = () => {
  return (
    <div className="navbar">
      <span className="navbar__logo">Mrkt</span>
      <HamburgerMenu />
      <Cart />
      <Inbox />
      <SearchBar />
    </div>
  );
};

export default NavBar;
