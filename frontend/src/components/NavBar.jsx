import React from 'react';
import HamburgerMenu from './NavBar-Components/HamburgerMenu';
import Cart from './NavBar-Components/Cart';
import Inbox from './NavBar-Components/Inbox';
import SearchBar from './NavBar-Components/SearchBar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {

  const noSearchBar = ['/cart', '/inbox'];
  const location = useLocation();

  return (
    <div>
      <nav className="flex items-center justify-between h-16 px-4 bg-[#F7F4F0]">
        <div>
          <HamburgerMenu />
        </div>
        <img
          src="/Logo.png"
          alt="Mrkt Logo"
          className="w-20 h-20 mt-6"
        />
        <div className="flex items-center gap-4 mt-6">

          <Link to="/cart">
            <div className="flex items-center">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                <FontAwesomeIcon icon={faCartShopping} size="2x" />
              </a>
            </div>
          </Link>

          <Link to="/inbox">
            <div className="flex items-center">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                <FontAwesomeIcon icon={faEnvelope} size="2x" />
              </a>
            </div>
          </Link>

        </div>
      </nav>
      <div className="bg-[#F7F4F0] p-4">
        
        {!noSearchBar.includes(location.pathname) && (
          <SearchBar />
        )}

      </div>
    </div>
  );
};

export default NavBar;
