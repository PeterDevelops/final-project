import React from 'react'
import '../../styles/Cart.scss';

const CartListItem = ({product_photo_url, product_name, quantity, price_cents}) => {

  const subtotal = (price_cents * quantity / 100)

  return (
    <div className='cart-center'>
    <img
    src={product_photo_url}
    alt={product_name}
    className='vendor-logo'
    />
    <span className='span-tag'>{product_name}</span>
    <span className='span-tag'>Quantity: {quantity}</span>
    <span className='span-tag'>Subtotal: ${subtotal}</span>
  </div>

  )

};

export default CartListItem;
