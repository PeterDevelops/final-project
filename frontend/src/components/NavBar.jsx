import React from 'react';
import HamburgerMenu from './NavBar-Components/HamburgerMenu';
import Cart from './Routes/Cart';
import Inbox from './Routes/Inbox';
import SearchBar from './NavBar-Components/SearchBar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const NavBar = (props) => {
  const { products } = props;
  return (

    <div>
      <nav className="flex items-center justify-between h-16 px-4 bg-[#F7F4F0]">

          <HamburgerMenu />

        <img
          src="/Logo.png"
          alt="Mrkt Logo"
          className="w-20 h-20 mt-6"
        />
        <div className="flex items-center gap-4 mt-6">
          <Link to="/cart" className="text-gray-700 hover:text-gray-900 flex items-center">
            <FontAwesomeIcon icon={faCartShopping} size="2x" />
          </Link>
          <Link to="/inbox" className="text-gray-700 hover:text-gray-900 flex items-center">
            <FontAwesomeIcon icon={faEnvelope} size="2x" />
          </Link>
        </div>
      </nav>

      <div className="bg-[#F7F4F0] p-4">
        <SearchBar products={products}/>
      </div>

    </div>



  );
};

export default NavBar;
