import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from 'react-router-dom';
import QuantityInput from './QuantityInput';

const CartListItem = (props) => {
  const {
    product_photo_url,
    product_name,
    quantity,
    onChange,
    onDelete
  } = props;

  const location = useLocation();
  const noQuantity = ['/cart'];
  const noDelete = ['/checkout'];

  return (
    <div className='bg-white flex justify-between items-center p-4 mb-4 rounded-md shadow-md'>
      <div className='flex items-center'>
        <img
          src={product_photo_url}
          alt={product_name}
          className='w-14 h-14 rounded-md mr-4'
        />
        <span className='font-bold text-sm'>{product_name}</span>
      </div>

      <div className='flex items-center space-x-4'>
        {!noQuantity.includes(location.pathname) && (
          <span className='font-bold text-sm'>Qty: {quantity}</span>
        )}
        <QuantityInput defaultQuantity={quantity} onChange={onChange} />

        {!noDelete.includes(location.pathname) && (
          <IconButton
            aria-label='delete'
            size='large'
            onClick={onDelete}
            className='text-red-500 hover:text-red-700'
          >
            <DeleteIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default CartListItem;
