import React from 'react'
import '../../styles/Cart.scss';
import { useLocation } from 'react-router-dom';

const CartListItem = (props) => {
  const {
    product_photo_url,
    product_name,
    quantity,
    price_cents
  } = props;
  const subtotal = (price_cents * quantity / 100)
  const location = useLocation();
  const noSubtotal = ['/checkout'];

  return (
    <div className='cart-center'>
    <img
      src={product_photo_url}
      alt={product_name}
      className='vendor-logo'
    />
    <span className='span-tag'>{product_name}</span>
    <span className='span-tag'>Quantity: {quantity}</span>

    {!noSubtotal.includes(location.pathname) && (
      <span className='span-tag'>Subtotal: ${subtotal}</span>
    )}


  </div>

  )

};

export default CartListItem;
