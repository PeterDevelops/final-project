import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faStore, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function Grouped() {
  const options = productsVendorsAndLocations.map((option) => ({
    ...option,
    category: option.category || 'Unknown',
    icon: getIconForCategory(option.category),
  }));

  return (
    <div className="p-4 max-w-md mx-auto">
      <Autocomplete
        id="grouped-demo"
        options={options}
        groupBy={(option) => option.category}
        getOptionLabel={(option) => option.title}
        sx={{ width: '100%' }}
        renderOption={(props, option) => (
          <li {...props} className="flex items-center p-2 border border-gray-300 rounded-md cursor-pointer">
            <FontAwesomeIcon icon={option.icon} className="mr-2" />
            <span>{option.title}</span>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by Product, Vendor or Location"
            className="bg-gray-100 shadow-md"
            sx={{
              borderRadius: '9999px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '9999px',
                border: '1px solid #d1d5db',
              },
            }}
          />
        )}
      />
    </div>
  );
}

function getIconForCategory(category) {
  switch (category) {
    case 'Product':
      return faSeedling;
    case 'Vendor':
      return faStore;
    case 'Location':
      return faMapMarkerAlt;
    default:
      return null;
  }
}

const productsVendorsAndLocations = [
  { title: 'Stock - Beef, White', category: 'Product' },
  { title: 'Nitzsche Inc', category: 'Vendor' },
  { title: 'Bellamy\'s Beet Booth', category: 'Location' },
];
