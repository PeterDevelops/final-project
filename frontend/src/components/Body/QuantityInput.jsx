import React, { useState, useEffect } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { InputNumber } from 'primereact/inputnumber';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useLocation } from 'react-router-dom';

const QuantityInput = ({ defaultQuantity, onChange }) => {
  const [quantity, setQuantity] = useState(defaultQuantity);
  const location = useLocation();
  const noNumberInput = ['/checkout'];

  useEffect(() => {
    setQuantity(defaultQuantity);
  }, [defaultQuantity])

  const handleValueChange = (e) => {
    setQuantity(e.value)
    if (onChange) onChange(e.value);
  }

  return (
    <PrimeReactProvider>
      {!noNumberInput.includes(location.pathname) && (
        <div className="flex items-center">
          <button
            className="text-black mx-2 w-0 h-2 rounded-sm flex items-center justify-center"
            onClick={() => handleValueChange({ value: quantity - 1 })}
            aria-label="Decrease quantity"
          >
            <i className="pi pi-minus text-xs"></i>
          </button>
          <InputNumber
            value={quantity}
            onValueChange={handleValueChange}
            showButtons
            buttonLayout="vertical"
            style={{ width: '1.75rem' }}
            incrementButtonClassName="hidden"
            decrementButtonClassName="hidden"
          />
          <button
            className="text-black mx-2 w-0 h-2 rounded-sm flex items-center justify-center"
            onClick={() => handleValueChange({ value: quantity + 1 })}
            aria-label="Increase quantity"
          >
            <i className="pi pi-plus text-xs"></i>
          </button>
        </div>
      )}
    </PrimeReactProvider>
  );
};

export default QuantityInput;
