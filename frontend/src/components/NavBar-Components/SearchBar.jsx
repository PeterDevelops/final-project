import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAppleWhole,
  faSeedling,
  faStore,
  faMapMarkerAlt,
  faDrumstickBite,
  faBreadSlice
} from '@fortawesome/free-solid-svg-icons';

export default function Grouped(props) {
  const { products, vendors, locations, categories } = props;

  const categorizeProducts = () => {
    if (Array.isArray(products) && products.length > 0) {
      const subCategories = {};

      products.forEach(product => {
        if (product.sub_category) {
          const id = `${product.category}-${product.sub_category}`;
          if (!subCategories[id]) {
            subCategories[id] = {
              id,
              category: product.category,
              name: product.sub_category,
              icon: getIconForCategory(product.category),
            };
          }
        }
      });
      return Object.values(subCategories);
    }
    return [];
  };

  const categorizeVendors = () => {
    if (Array.isArray(locations) && locations.length > 0) {
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
    const productData = categorizeProducts();
    const vendorData = categorizeVendors();
    const locationData = categorizeLocations();

    const allData = [...productData, ...vendorData, ...locationData];

    return allData.sort((a, b) => a.category.localeCompare(b.category));
  };



  function getIconForCategory(category) {
    switch (category) {
      case 'Vegetable':
        return faSeedling;
      case 'Fruit':
        return faAppleWhole;
      case 'Meat':
        return faDrumstickBite;
      case 'Miscellaneous':
        return faBreadSlice;
      case 'Vendor':
        return faStore;
      case 'Location':
        return faMapMarkerAlt;
      default:
        return null;
    }
  }

  // // filter the NUMBER of suggestions that show (how to show 2 in each category)
  // const filterOptions = createFilterOptions({
  //   limit: 2,

  // });

  return (
    <div className="p-4 max-w-md mx-auto">
      <Autocomplete
        id="grouped-demo"
        options={combinedData()}
        groupBy={(option) => option.category}
        getOptionLabel={(option) => option.name}
        sx={{ width: '100%' }}
        // filterOptions={filterOptions}
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



