import React from 'react';
import HamburgerMenu from './NavBar-Components/HamburgerMenu';
import Cart from './NavBar-Components/Cart';
import Inbox from './NavBar-Components/Inbox';
import SearchBar from './NavBar-Components/SearchBar';

const NavBar = (props) => {
  const { products } = props;
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
          <Cart />
          <Inbox />
        </div>
      </nav>
      <div className="bg-[#F7F4F0] p-4">
        <SearchBar products={products}/>
      </div>
    </div>
  );
};

export default NavBar;
