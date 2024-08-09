import React, { useState } from 'react';
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

  const [isOpen, setIsOpen] = useState(false);

  const handleMenuStateChange = (state) => {
    setIsOpen(state.isOpen);
  };

  const closeMenu = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const handleProductsClick = () => {
    setProducts(allProducts);
    closeMenu();
  };

  const handleVendorsClick = () => {
    setVendors(allVendors);
    closeMenu();
  };

  return (
    <Menu
      isOpen={isOpen}
      onStateChange={handleMenuStateChange}
    >
      <Link to="/" className="menu-item" onClick={closeMenu}>Home</Link>
      <Link to="/products" className="menu-item" onClick={handleProductsClick}>Products</Link>
      {user && <Link to="/products/new" className="menu-item" onClick={closeMenu}>New Product</Link>}
      <Link to="/vendors" className="menu-item" onClick={handleVendorsClick}>Vendors</Link>
      {user && <Link to="/vendors/new" className="menu-item" onClick={closeMenu}>New Vendor</Link>}
      <Link to="/locations" className="menu-item" onClick={closeMenu}>Locations</Link>
      <Link to="/categories" className="menu-item" onClick={closeMenu}>Categories</Link>
    </Menu>
  );
};

export default HamburgerMenu;
