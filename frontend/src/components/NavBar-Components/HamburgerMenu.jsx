import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../../styles/HamburgerMenu.scss';
import { Link } from 'react-router-dom';

const HamburgerMenu = (props) => {
  const {
    setProducts,
    allProducts,
    setVendors,
    allVendors,
    user,
  } = props;
  const handleProductsClick = () => {
    setProducts(allProducts);
  }
  const handleVendorsClick = () => {
    setVendors(allVendors);
  }
  return (
    <Menu>
      {/* <a className="menu-item" href="#">Home</a> */}
      <Link to="/" className="menu-item">Home</Link>
      <Link to="/products" className="menu-item" onClick={handleProductsClick}>Products</Link>
      {user && <Link to="/products/new" className="menu-item" >New Product</Link>}
      <Link to="/vendors" className="menu-item" onClick={handleVendorsClick}>Vendors</Link>
      {user && <Link to="/vendors/new" className="menu-item" >New Vendor</Link>}
      <Link to="/locations" className="menu-item">Locations</Link>
      <Link to="/categories" className="menu-item">Categories</Link>
    </Menu>

  );
};

export default HamburgerMenu;
