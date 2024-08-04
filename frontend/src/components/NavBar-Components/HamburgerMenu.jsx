import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../../styles/HamburgerMenu.scss';
import { Link } from 'react-router-dom';

const HamburgerMenu = (props) => {
  const { setProducts, allProducts } = props;
  const handleProductsClick = () => {
    setProducts(allProducts);
  }
  return (
    <Menu>
      {/* <a className="menu-item" href="#">Home</a> */}
      <Link to="/" className="menu-item">Home</Link>
      <Link to="/products" className="menu-item" onClick={handleProductsClick}>Products</Link>
      <Link to="/vendors" className="menu-item">Vendors</Link>
      <Link to="/locations" className="menu-item">Locations</Link>
      <Link to="/categories" className="menu-item">Categories</Link>
    </Menu>

  );
};

export default HamburgerMenu;
