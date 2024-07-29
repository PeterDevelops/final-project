import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../../styles/HamburgerMenu.scss';
import { Link } from 'react-router-dom';

const HamburgerMenu = () => {
  return (
    <Menu>
      {/* <a className="menu-item" href="#">Home</a> */}
      <Link to="/" className="menu-item">Home</Link>
      <Link to="/products" className="menu-item">Products</Link>
      <Link to="/vendors" className="menu-item">Vendors</Link>
      <Link to="/locations" className="menu-item">Locations</Link>
    </Menu>

  );
};

export default HamburgerMenu;
