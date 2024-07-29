import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import HamburgerMenu from '../NavBar-Components/HamburgerMenu';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';

const Cart = ({ products, vendors, locations }) => {

  const navigate = useNavigate();

  return (

    <div>
      <NavBar products={products} vendors={vendors} locations={locations} />

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
