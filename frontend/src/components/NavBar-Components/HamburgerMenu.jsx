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
    categories
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

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

  const handleCategoryClick = (category) => {
    const filteredProducts = allProducts.filter(product => product.category === category);
    setProducts(filteredProducts);
    closeMenu();
  };

  const toggleProductsDropdown = (e) => {
    e.preventDefault();
    setIsProductsDropdownOpen(!isProductsDropdownOpen);
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

      <div className="menu-item">
        <div className="flex items-center justify-between">
          <Link to="/products" onClick={handleProductsClick}>Products</Link>
          <button onClick={toggleProductsDropdown} className="ml-2 focus:outline-none">
            ▼
          </button>
        </div>
        {isProductsDropdownOpen && (
          <div className="flex flex-col pl-6 mt-2">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/products"
                className="py-1 hover:underline"
                onClick={() => handleCategoryClick(category.category)}
              >
                {category.category}
              </Link>
            ))}
            {user && <Link to="/products/new" className="menu-item" onClick={closeMenu}>New Product</Link>}
          </div>
        )}
      </div>

      <Link to="/vendors" className="menu-item" onClick={handleVendorsClick}>Vendors</Link>
      {user && <Link to="/vendors/new" className="menu-item" onClick={closeMenu}>New Vendor</Link>}
      <Link to="/locations" className="menu-item" onClick={closeMenu}>Locations</Link>
      <Link to="/categories" className="menu-item" onClick={closeMenu}>Categories</Link>
    </Menu>
  );
};

export default HamburgerMenu;
