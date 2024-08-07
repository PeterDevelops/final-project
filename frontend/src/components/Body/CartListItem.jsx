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
    <div className='cart-center'>
      <img
        src={product_photo_url}
        alt={product_name}
        className='vendor-logo'
      />

      <span className='span-tag'>{product_name}</span>

      {!noQuantity.includes(location.pathname) && (
        <span className='span-tag'>Qty: {quantity}</span>
      )}

      <div>
        <QuantityInput defaultQuantity={quantity} onChange={onChange}/>
      </div>

      {!noDelete.includes(location.pathname) && (
      <div>
        <IconButton aria-label="delete" size="large" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
      )}



      {/* {!noSubtotal.includes(location.pathname) && (
      <span className='span-tag'>Subtotal: ${subtotal}</span>
    )} */}


    </div>

  );

};

export default CartListItem;
