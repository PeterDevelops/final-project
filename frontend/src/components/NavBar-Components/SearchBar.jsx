import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faStore, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function Grouped(props) {
  const { products } = props;

  const optionsFunc = () => {
    if (products.length > 0) {
      return products.map((product) => ({
        ...product,
        category: 'Product',
        icon: getIconForCategory('Product'),
      }));
    }
    return [];
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <Autocomplete
        id="grouped-demo"
        options={optionsFunc()}
        groupBy={(option) => option.category}
        getOptionLabel={(option) => option.name}
        sx={{ width: '100%' }}
        renderOption={({ props }, option) => (
          <li {...props} key={option.id} className="flex items-center p-2 border border-gray-300 rounded-md cursor-pointer">
            <FontAwesomeIcon icon={option.icon} className="mr-2" />
            <span>{option.name}</span>
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

