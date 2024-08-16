import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../../styles/HamburgerMenu.scss';
import { Link, useNavigate } from 'react-router-dom';

/**
 * HamburgerMenu is a component that provides a responsive hamburger menu with links and dropdowns for products and vendors.
 *
 * @param {Object} props - The component's props.
 * @param {Function} props.setProducts - Function to set the list of products.
 * @param {Array} props.allProducts - List of all available products.
 * @param {Function} props.setVendors - Function to set the list of vendors.
 * @param {Array} props.allVendors - List of all available vendors.
 * @param {Object} [props.user] - Optional user object for determining admin privileges.
 * @param {Array} props.categories - List of product categories.
 *
 * @returns {JSX.Element} - The rendered HamburgerMenu component.
 */
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
  const [isVendorsDropdownOpen, setIsVendorsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  /**
   * Handles changes to the menu state.
   *
   * @param {Object} state - The new state of the menu.
   */
  const handleMenuStateChange = (state) => {
    setIsOpen(state.isOpen);
  };

  /**
   * Closes the menu if it is currently open.
   */
  const closeMenu = () => {
    if (isOpen) setIsOpen(false);
  };

  /**
   * Handles clicking on the "Products" menu item, setting all products and closing the menu.
   */
  const handleProductsClick = () => {
    setProducts(allProducts);
    closeMenu();
  };

  /**
   * Handles clicking on a category, filters products by category, and closes the menu.
   *
   * @param {string} category - The category to filter by.
   */
  const handleCategoryClick = (category) => {
    const filteredProducts = allProducts.filter(product => product.category === category);
    setProducts(filteredProducts);
    closeMenu();
  };

  /**
   * Handles clicking on the "Vendors" menu item, setting all vendors and closing the menu.
   */
  const handleVendorsClick = () => {
    setVendors(allVendors);
    closeMenu();
  };

  /**
   * Handles clicking on a vendor, filters products by vendor, navigates to the vendor detail page, and closes the menu.
   *
   * @param {Object} vendor - The vendor to filter by.
   */
  const handleVendorClick = (vendor) => {
    setVendors([vendor]);
    const filteredProducts = allProducts.filter(product => product.vendor_id === vendor.id);
    setProducts(filteredProducts);
    navigate(`/vendors/${vendor.id}`, { state: { vendor } });
    closeMenu();
  };

  return (
    <Menu isOpen={isOpen} onStateChange={handleMenuStateChange}>
      <Link to='/' className='menu-item' onClick={closeMenu}>Home</Link>

      <div className='menu-item'>
        <div className='flex items-center justify-between'>
          <Link to='/products' onClick={handleProductsClick}>Products</Link>
          <button onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)} className='ml-2 focus:outline-none'>
            ▼
          </button>
        </div>
        {isProductsDropdownOpen && (
          <div className='flex flex-col pl-6 mt-2'>
            {categories.map((category, index) => (
              <Link
                key={index}
                to='/products'
                className='py-1 hover:underline'
                onClick={() => handleCategoryClick(category.category)}
              >
                {category.category}
              </Link>
            ))}
            {user && <Link to='/products/new' className='menu-item' onClick={closeMenu}>New Product</Link>}
          </div>
        )}
      </div>

      <div className='menu-item'>
        <div className='flex items-center justify-between'>
          <Link to='/vendors' onClick={handleVendorsClick}>Vendors</Link>
          <button onClick={() => setIsVendorsDropdownOpen(!isVendorsDropdownOpen)} className='ml-2 focus:outline-none'>
            ▼
          </button>
        </div>
        {isVendorsDropdownOpen && (
          <div className='flex flex-col pl-6 mt-2'>
            {allVendors.map((vendor, index) => (
              <span
                key={index}
                className='py-1 hover:underline text-left cursor-pointer'
                onClick={() => handleVendorClick(vendor)}
              >
                {vendor.name}
              </span>
            ))}
            <Link to='/locations' className='menu-item' onClick={closeMenu}>Location Map</Link>
            {user && <Link to='/vendors/new' className='py-1 hover:underline text-left' onClick={closeMenu}>New Vendor</Link>}
          </div>
        )}
      </div>

      <Link to='/inbox' className='menu-item' onClick={closeMenu}>Inbox</Link>
    </Menu>
  );
};

export default HamburgerMenu;
