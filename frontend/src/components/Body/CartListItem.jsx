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
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // margin-bottom: 20px;
  // font-size: 1.2rem;

  // .cart-container {
  //   max-width: 800px;
  //   margin: 20px auto;
  //   padding: 20px;
  //   background-color: #f9f9f9;
  //   border-radius: 8px;
  //   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  // }
  return (
    <div className='bg-gray-50 flex justify-between items-center p-4 mb-4 rounded-md shadow-md'>
      {/* <div className='flex items-center text-lg'> */}
      <div className='flex items-center'>
        <div className='flex justify-center items-center'>
          <img
            src={product_photo_url}
            alt={product_name}
            className='item-logo mr-4'
          />
          <span className='span-tag'>{product_name}</span>
        </div>
      </div>

      <div className='flex items-center'>
        {!noQuantity.includes(location.pathname) && (
          <span className='span-tag'>Qty: {quantity}</span>
        )}
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
      </div>
    </div>

  );

};

export default CartListItem;
