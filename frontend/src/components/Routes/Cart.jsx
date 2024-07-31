import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../NavBar';
import '../../styles/Cart.scss';
import { Link } from 'react-router-dom';

const Cart = ({ products, vendors, locations, categories, orders }) => {

  const navigate = useNavigate();
  console.log('Orders:', orders);
  return (

    <div>
      <NavBar products={products} vendors={vendors} locations={locations} categories={categories} />

      <div className='cart-container'>
        <div className='cart-center'>
          <span>Vendor Photo</span>
          <span className='span-tag'>Vendor Name</span>
        </div>

        <div className='cart-center'>
          Your Cart
        </div>

        <div className='cart-center'>
          <span>Order Item Photo</span>
          <span className='span-tag'>Order Item Info</span>
          <span className='span-tag'>Product Item Subtotal</span>
        </div>

        <div className='total'>
          Total: $$$
        </div>
        <Link to='/checkout'>
          <div className='cart-center'>
            <button className='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300
        font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700
        dark:focus:ring-green-800'>
              Checkout
            </button>
          </div>
        </Link>

        <div className='cart-center'>
          <button onClick={() => navigate('/')}>Continue Shopping</button>
        </div>

      </div>
    </div>
  );
};

export default Cart;
