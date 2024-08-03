import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import HamburgerMenu from './NavBar-Components/HamburgerMenu';
import Cart from './Routes/Cart';
import Inbox from './Routes/Inbox';
import SearchBar from './NavBar-Components/SearchBar';
import LoginBtn from './NavBar-Components/LoginBtn'
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const NavBar = (props) => {
  const { products, vendors, locations, categories, user, setUser } = props;

  const [inboxData, setInboxData] = useState([]);

  const location = useLocation();
  const noSearchBar = ['/cart', '/checkout', '/inbox'];

  const handleClick = async () => {
    // console.log("inbox clicked")
    
    if (user !== null) {
      // console.log("front end user id", user.id)
      const response = await axios.get(`/inboxes/${user.id}`);
      const userInboxData = response.data;
      // console.log("user inbox data from backend", userInboxData) ;
      // console.log("inbox data length", userInboxData.length);

      if (userInboxData.length > 0) {
        setInboxData(userInboxData)
      } else {
        console.log("Error retrieving inbox data")
      }
    }

    else {
      console.log("Not logged in")
    }
  }

  return (

    <div>
      <nav className="flex items-center justify-between h-16 px-4 bg-[#F7F4F0]">

        <HamburgerMenu />

        {/* LOGO */}
        <Link to="/"><img
          src="/Logo.png"
          alt="Mrkt Logo"
          className="w-20 h-20 mt-6"
        /></Link>

        <div className="flex items-center gap-4 mt-6">
          <LoginBtn products={products} vendors={vendors} locations={locations} categories={categories} user={user} setUser={setUser} />
          <Link to="/cart" className="text-gray-700 hover:text-gray-900 flex items-center">
            <FontAwesomeIcon icon={faCartShopping} size="2x" />
          </Link>
          <Link to="/inbox" className="text-gray-700 hover:text-gray-900 flex items-center" state={{inboxData: inboxData}}>
            <FontAwesomeIcon onClick={handleClick} icon={faEnvelope} size="2x" />
          </Link>
        </div>
      </nav>

      {/* exclude SearchBar from specified routes */}
      {!noSearchBar.includes(location.pathname) && (
        <div className="bg-[#F7F4F0] p-4">
          <SearchBar products={products} vendors={vendors} locations={locations} categories={categories} />
        </div>
      )}
      {/* Add spacer where search bar would be */}
      {noSearchBar.includes(location.pathname) && (
        <div className='bg-[#F7F4F0] p-4'></div>
      )}
    </div>



  );
};

export default NavBar;
