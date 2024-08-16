import React, { useState, useEffect } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { InputNumber } from 'primereact/inputnumber';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useLocation } from 'react-router-dom';

/**
 * QuantityInput component allows users to select a quantity using buttons or direct input.
 *
 * @param {Object} props - The component's props.
 * @param {number} props.defaultQuantity - The initial quantity value.
 * @param {Function} props.onChange - Callback function to handle quantity changes.
 *
 * @returns {JSX.Element} The rendered QuantityInput component.
 */
const QuantityInput = (props) => {
  const {
    defaultQuantity,
    onChange
  } = props;

  const [quantity, setQuantity] = useState(defaultQuantity);
  const location = useLocation();
  const noNumberInput = ['/checkout']; // Paths where the quantity input should not be shown

  useEffect(() => {
    // Update quantity state when defaultQuantity changes
    setQuantity(defaultQuantity);
  }, [defaultQuantity]);

  /**
   * Handles changes in the quantity value.
   *
   * @param {Object} e - Event object containing the new value.
   */
  const handleValueChange = (e) => {
    setQuantity(e.value);
    if (onChange) onChange(e.value);
  };

  return (
    <PrimeReactProvider>
      {/* Conditionally render quantity input based on the current path */}
      {!noNumberInput.includes(location.pathname) && (
        <div className='flex items-center'>
          {/* Decrease quantity button */}
          <button
            className='text-black mx-2 w-6 h-6 rounded-sm flex items-center justify-center'
            onClick={() => handleValueChange({ value: Math.max(quantity - 1, 1) })}
            aria-label='Decrease quantity'
          >
            <i className='pi pi-minus text-xs'></i>
          </button>

          {/* InputNumber component for direct input */}
          <InputNumber
            value={quantity}
            onValueChange={handleValueChange}
            showButtons
            buttonLayout='vertical'
            style={{ width: '1.5rem' }}
            incrementButtonClassName='hidden' // Hide increment button
            decrementButtonClassName='hidden' // Hide decrement button
            min={1} // Minimum value is 1
          />

          {/* Increase quantity button */}
          <button
            className='text-black mx-2 w-6 h-6 rounded-sm flex items-center justify-center'
            onClick={() => handleValueChange({ value: quantity + 1 })}
            aria-label='Increase quantity'
          >
            <i className='pi pi-plus text-xs'></i>
          </button>
        </div>
      )}
    </PrimeReactProvider>
  );
};

export default QuantityInput;
