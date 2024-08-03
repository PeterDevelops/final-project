import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';


export default function SearchBar(props) {
  const { products, setProducts, allProducts, vendors, locations, categories } = props;
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  console.log('AllProducts:', allProducts);

  const categorizeProducts = () => {
    if (Array.isArray(allProducts) && allProducts.length > 0) {
      const subCategories = {};

      allProducts.forEach(product => {
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

  const handleOptionClick = (option) => {
    if (option.vendor_logo_url) {
      const filteredByVendor = allProducts.filter(product => product.vendor_id === option.id);
      setProducts(filteredByVendor);
      navigate('/products', { state: { allProducts } });
    } else {
      const filteredBySubCategory = allProducts.filter(product => product.sub_category === option.name);
      setProducts(filteredBySubCategory);
      navigate('/products', { state: { allProducts } });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const filtered = allProducts.filter(product => product.sub_category.toLowerCase() === inputValue.toLowerCase());
    setProducts(filtered);
    navigate('/products', { state: { allProducts }});
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <Autocomplete
          id="grouped-demo"
          options={combinedData()}
          groupBy={(option) => option.category}
          getOptionLabel={(option) => option.name}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
          sx={{ width: '100%' }}
          renderOption={({ props }, option) => (
            <li
              {...props}
              key={option.id}
              className="flex items-center p-2 border border-gray-300 rounded-md cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
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
      </form>
    </div>
  );
}
