import { React } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faStore, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function Grouped(props) {
  const { products, vendors, locations } = props;

  // console.log("Products Data---", products)
  // console.log("Vendors Data---", vendors)
  // console.log("Locations Data---", locations)

  const categorizeProducts = () => {
    if (products.length > 0) {
      return products.map((product) => ({
        ...product,
        key: product.id,
        category: 'Product',
        icon: getIconForCategory('Product'),
      }));
    }
    return [];
  }

  const categorizeVendors = () => {
    if (vendors.length > 0) {
      return vendors.map((vendor) => ({
        ...vendor,
        key: vendor.id,
        category: 'Vendor',
        icon: getIconForCategory('Vendor'),
      }));
    }
    return [];
  };

  const categorizeLocations = () => {
    if (locations.length > 0) {
      return locations.map((location) => ({
        ...location,
        key: location.id,
        name: location.city,
        category: 'Location',
        icon: getIconForCategory('Location'),
      }));
    }
    return [];
  };

  const combinedData = () => {
    const productData = categorizeProducts() || [];
    // console.log("ProductData---", productData)
    const vendorData = categorizeVendors() || [];
    // console.log("VendorData---", vendorData)
    const locationData = categorizeLocations() || [];
    // console.log("LocationData---", locationData)

    const options = [...productData, ...vendorData, ...locationData];

    return options;
  };

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

  // console.log('combined data-------', combinedData());

  //filter the NUMBER of suggestions that show (how to show 2 in each category)
  const filterOptions = createFilterOptions({
    limit: 2,
   
  });

  return (
    <div className="p-4 max-w-md mx-auto">
      <Autocomplete
        id="grouped-demo"
        options={combinedData()}
        groupBy={(option) => option.category}
        getOptionLabel={(option) => option.name}
        sx={{ width: '100%' }}
        filterOptions={filterOptions}
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



