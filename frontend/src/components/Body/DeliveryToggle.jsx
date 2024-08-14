import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const DeliveryToggle = (props) => {
  const {
    alignment,
    setAlignment
  } = props;
  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Delivery options"
    >
      <ToggleButton value="pickup">Pickup</ToggleButton>
      <ToggleButton value="delivery">Delivery</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default DeliveryToggle;
