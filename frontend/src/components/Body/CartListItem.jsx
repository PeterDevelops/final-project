import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import '../../styles/Cart.scss';
import { useLocation } from 'react-router-dom';
import QuantityInput from './QuantityInput';

const CartListItem = (props) => {
  const {
    product_photo_url,
    product_name,
    quantity,
    price_cents,
    setQuantities,
    onChange,
    onDelete
  } = props;

  const location = useLocation();
  const noQuantity = ['/cart'];
  const noDelete = ['/checkout'];

  return (
    <div className='cart-container'>
      <div className='cart-center'>
        <div className='cart-item-container'>

          <img
            src={product_photo_url}
            alt={product_name}
            className='item-logo'
          />

          <span className='span-tag'>{product_name}</span>

        </div>
        <div className='cart-center'>
        {!noQuantity.includes(location.pathname) && (
          <span className='span-tag'>Qty: {quantity}</span>
        )}
        </div>

        <span>
          <QuantityInput defaultQuantity={quantity} onChange={onChange} />
        </span>

        {!noDelete.includes(location.pathname) && (
          <span>
            <IconButton className='delete-button' aria-label="delete" size="large" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </span>
        )}




        {/* {!noSubtotal.includes(location.pathname) && (
      <span className='span-tag'>Subtotal: ${subtotal}</span>
    )} */}


      </div>
    </div>
  );

};

export default CartListItem;
