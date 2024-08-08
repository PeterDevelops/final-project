import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import '../../styles/Cart.scss';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function DeliveryToggle({ alignment, setAlignment }) {
  // const [alignment, setAlignment] = React.useState('web');
  const [subType, setSubType] = useState("pickup");
  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      // setSubType(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="pickup">Pickup</ToggleButton>

      <ToggleButton value="delivery">Delivery</ToggleButton>

    </ToggleButtonGroup>
    // <Box sx={{ display: "flex" }}>
    //   <Box className="mask-box">
    //     <Box
    //       className="mask"
    //       style={{
    //         transform: `translateX(${subType === "pickup" ? 0 : "100px"})`
    //       }}
    //     />
    //     <Button
    //       disableRipple
    //       variant="text"
    //       sx={{ color: subType === "pickup" ? "#ffffff" : "#5316AE" }}
    //       onClick={() => handleChange("pickup")}
    //     >
    //       Pickup
    //     </Button>
    //     <Button
    //       disableRipple
    //       variant="text"
    //       sx={{ color: subType === "delivery" ? "#ffffff" : "#5316AE" }}
    //       onClick={() => handle("delivery")}
    //     >
    //       Delivery
    //     </Button>
    //   </Box>
    // </Box>
  );
}
