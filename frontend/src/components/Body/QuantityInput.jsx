import React, { useState, useEffect } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { InputNumber } from 'primereact/inputnumber';
// import 'primereact/resources/themes/saga-blue/theme.css';
// import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../../styles/QuantityInput.scss';
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
        <InputNumber
          value={quantity}
          onValueChange={handleValueChange}
          showButtons buttonLayout="vertical"
          style={{ width: '2.2rem' }}
          decrementButtonClassName="p-button-secondary"
          incrementButtonClassName="p-button-secondary"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus" />
        )}
      </PrimeReactProvider>
  );
};

export default QuantityInput;
