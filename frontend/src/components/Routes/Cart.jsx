import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import HamburgerMenu from '../NavBar-Components/HamburgerMenu';
import { Link } from 'react-router-dom';

const Cart = () => {

  const navigate = useNavigate();

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
      
      <div>
        Your Cart
      </div>

      <div>
        Total: $$$
      </div>

      <div>
        <button className='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300
        font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700
        dark:focus:ring-green-800'>
          Checkout
        </button>
      </div>

      <div>
        <button onClick={() => navigate('/')}>Go to home page</button>
      </div>
    </div>
  );
};

export default Cart;
