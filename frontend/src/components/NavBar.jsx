import React from 'react';
import HamburgerMenu from './NavBar-Components/HamburgerMenu';
import SearchBar from './NavBar-Components/SearchBar';
import LoginBtn from './NavBar-Components/LoginBtn'
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faEnvelope } from '@fortawesome/free-solid-svg-icons';

/**
 * Navigation Bar component that includes a hamburger menu, logo, login button, cart icon, inbox icon, and optionally a search bar.
 *
 * @param {Object} props - Component props
 * @param {Function} props.setProducts - Function to set products
 * @param {Array} props.allProducts - Array of all products
 * @param {Function} props.setVendors - Function to set vendors
 * @param {Array} props.allVendors - Array of all vendors
 * @param {Array} props.categories - Array of product categories
 * @param {Object} props.user - Current user object
 * @param {Function} props.setUser - Function to set user
 * @param {Array} props.cartItems - Array of items in the cart
 * @returns {JSX.Element} The rendered component
 */
const NavBar = (props) => {
  const {
    setProducts,
    allProducts,
    setVendors,
    allVendors,
    categories,
    user,
    setUser,
    cartItems,
  } = props;

  const location = useLocation();

  // List of routes where the search bar should not be displayed
  const noSearchBar = ['/cart', '/checkout', '/inbox', '/chats', '/login', '/order-confirmation'];

  return (
    <nav className='bg-navbar border-b-4 border-border min-w-screen fixed top-0 left-0 right-0 font-body'>
      <div className='h-16 pt-6 px-4 flex items-center justify-between'>
        {/* Hamburger Menu Component */}
        <HamburgerMenu
          setProducts={setProducts}
          allProducts={allProducts}
          setVendors={setVendors}
          allVendors={allVendors}
          user={user}
          categories={categories}
        />
        {/* LOGO */}
        <Link to='/'>
          <img
            src='/Logo.png'
            alt='Mrkt Logo'
            className='w-20 h-20 mt-6'
          />
        </Link>
        <div className='flex items-center gap-2 mt-6'>
          {/* Login Button Component */}
          <LoginBtn
            user={user}
            setUser={setUser}
          />
          {/* Cart Icon with Item Count */}
          <Link to='/cart' className='text-icon hover:text-gray-900 flex items-center relative'>
            <FontAwesomeIcon icon={faShoppingBasket} size='2x' />
            {Array.isArray(cartItems) && cartItems.length > 0 && (
              <span className='absolute top-5 right-0 block w-5 h-5 text-center text-white text-sm bg-red-600 rounded-full'>
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
          {/* Inbox Icon */}
          <Link to='/inbox' className='text-icon hover:text-gray-900 flex items-center'>
            <FontAwesomeIcon icon={faEnvelope} size='2x' />
          </Link>
        </div>
      </div>
      {/* Conditionally render the SearchBar based on current route */}
      {!noSearchBar.includes(location.pathname) && (
        <div className='pt-10'>
          <SearchBar
            setProducts={setProducts}
            allProducts={allProducts}
            setVendors={setVendors}
            allVendors={allVendors}
          />
        </div>
      )}
      {/* Empty space when SearchBar is not shown */}
      {noSearchBar.includes(location.pathname) && (
        <div className='p-8'></div>
      )}
    </nav>
  );
};

export default NavBar;
