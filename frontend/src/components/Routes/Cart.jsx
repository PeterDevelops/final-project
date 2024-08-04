import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';
import '../../styles/Cart.scss';
import { Link } from 'react-router-dom';
import CartListItem from '../Body/CartListItem';

const Cart = (props) => {
  const {
    products,
    setProducts,
    allProducts,
    vendors,
    locations,
    categories,
    user,
    setUser,
    cartItems,
    totalCost
  } = props;

  const navigate = useNavigate();

  return (
    <div>
      <NavBar
        products={products}
        setProducts={setProducts}
        allProducts={allProducts}
        vendors={vendors}
        locations={locations}
        categories={categories}
        user={user}
        setUser={setUser}
      />
      <div className='cart-container'>
        <div className='cart-center'>
          {cartItems.length > 0 && (
            <span>
              <img
                className='vendor-logo'
                src={cartItems[0].vendor_logo_url}
                alt='vendor logo'
              />
            </span>
          )}
          <span className='span-tag'>
            {cartItems.length > 0 ? cartItems[0].vendor_name : "Vendor Name"}
          </span>
        </div>
        <div className='cart-center'>
          Your Cart
        </div>
        {cartItems.map(item => (
          <CartListItem
            key={item.order_item_id}
            product_photo_url={item.product_photo_url}
            product_name={item.product_name}
            quantity={item.quantity}
            price_cents={item.price_cents}
          />
        ))}
        <div className='total'>
          Total: ${totalCost / 100}
        </div>
        <Link to='/checkout'>
          <div className='cart-center'>
            <button className='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
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
