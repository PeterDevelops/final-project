import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../NavBar';
import '../../styles/Cart.scss';
import DeliveryToggle from '../Body/DeliveryToggle';

const Checkout = ({ products, vendors, locations }) => {

  const navigate = useNavigate();

  return (

    <div>
      <NavBar products={products} vendors={vendors} locations={locations} />


      <div className='cart-container'>

        <div className='cart-center'>
          <DeliveryToggle />
        </div>

        <div className='cart-center'>
          Order Summary
        </div>

        <div className='cart-center'>
          <span>Cart Item Photo</span>
          <span className='span-tag'>Cart Item Info</span>

        </div>

        <div className='total'>
          Total: $$$
        </div>

        <div className='cart-center'>
          <button className='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300
        font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700
        dark:focus:ring-green-800'>
            Pay
          </button>
        </div>
        <div className='cart-center'>
          <button onClick={() => navigate('/')}>Continue Shopping</button>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
