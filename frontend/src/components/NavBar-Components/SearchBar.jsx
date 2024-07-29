import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faStore, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function Grouped(props) {
  const { products, vendors } = props;
    
  // console.log("Products Data---", products)
  // console.log("Vendors Data---", vendors)

  const categorizeProducts = () => {
    if (products.length > 0) {
      const categorizedProducts = products.map((product) => ({
        ...product,
        key: product.id,
        category: 'Product',
        icon: getIconForCategory('Product'),
      }));
      return categorizedProducts
    }
  }

  const categorizeVendors = () => {
    if (vendors.length > 0) {
      const categorizedVendors = vendors.map((vendor) => ({
        ...vendor,
        key: vendor.id,
        category: 'Vendor',
        icon: getIconForCategory('Vendor'),
      }));
      return categorizedVendors
    }
  };

  const categorizeLocations = () => {
    if (vendors.length > 0) {
      const categorizedLocations = vendors.map((location) => ({
        key: location.id,
        name: location.city,
        category: 'Location',
        icon: getIconForCategory('Location'),
      }));
      return categorizedLocations
    }
  };

  const combinedData = () => {
    const productData = categorizeProducts();
    // console.log("ProductData---", productData)
    const vendorData = categorizeVendors();
    // console.log("VendorData---", vendorData)
    const locationData = categorizeLocations();
    // console.log("LocationData---", locationData)

    if (productData && vendorData) {
      const options = [...productData, ...vendorData, ...locationData]
      return options
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Autocomplete
        id="grouped-demo"
        options={combinedData()}
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
          // input
            {...params}
            //placeholder
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

