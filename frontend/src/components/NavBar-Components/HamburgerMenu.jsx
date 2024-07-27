import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../../styles/HamburgerMenu.scss';
import { Link } from 'react-router-dom';

const HamburgerMenu = () => {
  return (
    <Menu>
      {/* <a className="menu-item" href="#">Home</a> */}
      <Link to="/" >Home</Link>
      <Link to="/vendor-list" >Vendors</Link>
      <Link to="/product-list" >Products</Link>
      <Link to="/category-list" >Categories</Link>
    </Menu>

  );
};

export default HamburgerMenu;
