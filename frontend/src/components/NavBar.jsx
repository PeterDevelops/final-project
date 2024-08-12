import React from 'react';
import HamburgerMenu from './NavBar-Components/HamburgerMenu';
import Cart from './Routes/Cart';
import Inbox from './Routes/Inbox';
import SearchBar from './NavBar-Components/SearchBar';
import LoginBtn from './NavBar-Components/LoginBtn'
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const NavBar = (props) => {
  const {
    products,
    setProducts,
    allProducts,
    vendors,
    setVendors,
    allVendors,
    locations,
    categories,
    user,
    setUser,
    cartItems,
  } = props;

  const location = useLocation();

  const noSearchBar = ['/cart', '/checkout', '/inbox', '/chats', '/login', '/order-confirmation'];

  return (
    <div className='fixed top-0 left-0 right-0 font-body'>
      <nav className="h-16 px-4 bg-[#F7F4F0] bg-nav flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <HamburgerMenu setProducts={setProducts} allProducts={allProducts} setVendors={setVendors} allVendors={allVendors} user={user} categories={categories} />
          {/* LOGO */}
          <div className="mt-10">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img
              src="/Logo.png"
              alt="Mrkt Logo"
              className="w-16 h-16"
            />
          </Link>
          </div>

          <div className="flex items-center space-x-4 mt-7">
            <LoginBtn
              products={products}
              vendors={vendors}
              locations={locations}
              categories={categories}
              user={user}
              setUser={setUser}
            />
            <Link to="/cart" className="text-gray-700 hover:text-gray-900 flex items-center relative">
              <FontAwesomeIcon icon={faShoppingBasket} size="lg" />
              {Array.isArray(cartItems) && cartItems.length > 0 && (
                <span className="absolute top-0 right-0 block w-5 h-5 text-center text-white text-sm bg-red-600 rounded-full">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>
            <Link to="/inbox" className="text-gray-700 hover:text-gray-900 flex items-center">
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
            </Link>
          </div>
          </div>
      </nav>

      <div>
        {/* exclude SearchBar from specified routes */}
        {!noSearchBar.includes(location.pathname) && (
          <div className="bg-[#F7F4F0] bg-nav pt-7">
            <SearchBar
              products={products}
              setProducts={setProducts}
              allProducts={allProducts}
              vendors={vendors}
              setVendors={setVendors}
              allVendors={allVendors}
              locations={locations}
              categories={categories}
            />
          </div>
        )}
        {/* Add spacer where search bar would be */}
        {noSearchBar.includes(location.pathname) && (
          <div className='bg-[#F7F4F0] p-8'></div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
