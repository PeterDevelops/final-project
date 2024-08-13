import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
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
    <div className='bg-white flex justify-between items-center p-4 mb-4 rounded-md shadow-md w-full max-w-4xl mx-auto'>
      <div className='flex items-center w-full'>
        <div className='w-16 h-16 overflow-hidden rounded-md'>
        <img 
          src={product_photo_url}
          alt={product_name}
          className='w-full h-full object-cover'
        />
        </div>
        <span className='text-sm ml-4 flex-1 truncate whitespace-nowrap overflow-hidden max-w-[125px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] xl:max-w-[350px]'>{product_name}</span>
      </div>

      <div className='flex items-center space-x-2'>
        {!noQuantity.includes(location.pathname) && (
          <span className='font-bold text-xs'>Qty: {quantity}</span>
        )}
        <QuantityInput defaultQuantity={quantity} onChange={onChange}/>

        {!noDelete.includes(location.pathname) && (
        <button
        onClick={onDelete}
        className="text-xs bg-red-500 text-white py-1 px-2 rounded"
      >
        <FontAwesomeIcon icon={faTrashCan} />
        </button>
        )}
      </div>
    </div>
  );
};

export default CartListItem;
