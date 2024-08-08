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
    cartItems
  } = props;

  const location = useLocation();
  const noSearchBar = ['/cart', '/checkout', '/inbox', '/chats'];


  return (
    <div>
      <nav className="h-16 px-4 bg-[#F7F4F0]">
        <div className='flex items-center justify-between'>
          <HamburgerMenu setProducts={setProducts} allProducts={allProducts} setVendors={setVendors} allVendors={allVendors} user={user} />
          {/* LOGO */}
          <Link to="/">
            <img
              src="/Logo.png"
              alt="Mrkt Logo"
              className="w-20 h-20 mt-6"
            />
          </Link>

          <div className="flex items-center gap-4 mt-6">
            <LoginBtn
              products={products}
              vendors={vendors}
              locations={locations}
              categories={categories}
              user={user}
              setUser={setUser}
            />
            <Link to="/cart" className="text-gray-700 hover:text-gray-900 flex items-center relative">
              <FontAwesomeIcon icon={faShoppingBasket} size="2x" />
              {cartItems.length > 0 && (
                <span className="absolute top-5 right-0 block w-5 h-5 text-center text-white text-sm bg-red-600 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link to="/inbox" className="text-gray-700 hover:text-gray-900 flex items-center">
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </Link>
          </div>
        </div>
      </nav>

      <div>
        {/* exclude SearchBar from specified routes */}
        {!noSearchBar.includes(location.pathname) && (
          <div className="bg-[#F7F4F0] pt-10">
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
