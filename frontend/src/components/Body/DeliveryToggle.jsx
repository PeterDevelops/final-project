import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

/**
 * DeliveryToggle component provides a set of options for selecting delivery methods (Pickup or Delivery).
 *
 * @param {Object} props - The component's props.
 * @param {string} props.alignment - The current selected delivery option ('pickup' or 'delivery').
 * @param {Function} props.setAlignment - Function to update the selected delivery option.
 *
 * @returns {JSX.Element} The rendered DeliveryToggle component.
 */
const DeliveryToggle = (props) => {
  const { alignment, setAlignment } = props;

  /**
   * Handles changes in the toggle button selection.
   *
   * @param {React.MouseEvent<HTMLElement>} event - The event triggered by the toggle button click.
   * @param {string|null} newAlignment - The new selected value from the toggle button.
   */
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

