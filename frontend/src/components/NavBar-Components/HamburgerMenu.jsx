import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../../styles/HamburgerMenu.scss';

const HamburgerMenu = () => {
  return (
    <Menu>
      <a className="menu-item" href="#">Home</a>
      <a className="menu-item" href="#">Products</a>
      <a className="menu-item" href="#">Vendors</a>
      <a className="menu-item" href="#">Locations</a>
    </Menu>

  );
};

export default HamburgerMenu;
