import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import QuantityInput from './QuantityInput';

/**
 * CartListItem component renders an individual item in the cart list.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.product_photo_url - The URL of the product's photo.
 * @param {string} props.product_name - The name of the product.
 * @param {number} props.quantity - The quantity of the product in the cart.
 * @param {Function} props.onChange - Callback function for when the quantity changes.
 * @param {Function} props.onDelete - Callback function for when the delete button is clicked.
 *
 * @returns {JSX.Element} The rendered CartListItem component.
 */
const CartListItem = (props) => {
  const {
    product_photo_url,
    product_name,
    quantity,
    onChange,
    onDelete
  } = props;

  // Get the current location path from the router.
  const location = useLocation();

  // Define paths where quantity and delete functionalities should be hidden.
  const noQuantity = ['/cart'];
  const noDelete = ['/checkout'];

  return (
    <div className='bg-white flex justify-between items-center p-4 mb-4 rounded-md shadow-md w-full max-w-4xl mx-auto'>
      {/* Product image and name */}
      <div className='flex items-center w-10/12'>
        <div className='w-16 h-16 overflow-hidden rounded-md'>
          <img
            src={product_photo_url}
            alt={product_name}
            className='w-full h-full object-cover'
          />
        </div>
        <span className='text-sm ml-4 flex-1 truncate whitespace-nowrap overflow-hidden max-w-[125px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] xl:max-w-[350px]'>
          {product_name}
        </span>
      </div>

      {/* Quantity and delete button */}
      <div className='flex items-center space-x-2'>
        {/* Conditionally render quantity if not on the '/cart' path */}
        {!noQuantity.includes(location.pathname) && (
          <span className='font-bold text-xs'>Qty: {quantity}</span>
        )}
        <QuantityInput defaultQuantity={quantity} onChange={onChange} />

        {/* Conditionally render delete button if not on the '/checkout' path */}
        {!noDelete.includes(location.pathname) && (
          <button
            onClick={onDelete}
            className='text-xs bg-red-500 text-white py-1 px-2 rounded'
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CartListItem;
