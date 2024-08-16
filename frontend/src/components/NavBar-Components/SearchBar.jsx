import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAppleWhole,
  faSeedling,
  faStore,
  faDrumstickBite,
  faBreadSlice
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const SearchBar = (props) => {
  const {
    setProducts,
    allProducts,
    setVendors,
    allVendors
  } = props;
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const inputRef = useRef(null);

  const categorizeProducts = () => {
    if (!Array.isArray(allProducts) || !allProducts.length) return [];

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
  };

  const categorizeVendors = () => {
    if (!Array.isArray(allVendors) || !allVendors.length) return [];

    return allVendors.map(vendor => ({
      ...vendor,
      key: vendor.id,
      category: 'Vendor',
      icon: getIconForCategory('Vendor'),
    }));
  };

  const combinedData = () => {
    const productData = categorizeProducts();
    const vendorData = categorizeVendors();

    return [...productData, ...vendorData].sort((a, b) => a.category.localeCompare(b.category));
  };

  const getIconForCategory = (category) => {
    switch (category) {
      case 'Vegetable': return faSeedling;
      case 'Fruit': return faAppleWhole;
      case 'Meat': return faDrumstickBite;
      case 'Miscellaneous': return faBreadSlice;
      case 'Vendor': return faStore;
      default: return null;
    }
  };

  const handleOptionClick = (option) => {
    if (inputRef.current) inputRef.current.blur();

    if (option.vendor_logo_url) {
      const filteredByVendor = allProducts.filter(product => product.vendor_id === option.id);
      setProducts(filteredByVendor);
      setVendors([option]);
      navigate(`/vendors/${option.id}`, { state: { allProducts, allVendors } });
    } else {
      const filteredBySubCategory = allProducts.filter(product => product.sub_category === option.name);
      setProducts(filteredBySubCategory);
      navigate('/products', { state: { allProducts, allVendors } });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const matchedVendor = allVendors.find(vendor => vendor.name.toLowerCase() === inputValue.toLowerCase());
    const matchedSubCategory = allProducts.find(product => product.sub_category.toLowerCase() === inputValue.toLowerCase());

    if (inputRef.current) inputRef.current.blur();

    if (matchedVendor) {
      const filteredByVendor = allProducts.filter(product => product.vendor_id === matchedVendor.id);
      setProducts(filteredByVendor);
      setVendors([matchedVendor]);
      navigate(`/vendors/${matchedVendor.id}`, { state: { allProducts, allVendors } });
    } else if (matchedSubCategory) {
      const filteredBySubCategory = allProducts.filter(product => product.sub_category.toLowerCase() === inputValue.toLowerCase());
      setProducts(filteredBySubCategory);
      navigate('/products', { state: { allProducts } });
    } else if (filteredOptions.length > 0) {
      handleOptionClick(filteredOptions[0]);
    }
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    const newFilteredOptions = combinedData().filter(option =>
      option.name.toLowerCase().includes(newInputValue.toLowerCase())
    );
    setFilteredOptions(newFilteredOptions);
  };

  return (
    <div className='p-4 max-w-xl mx-auto font-body'>
      <form onSubmit={handleSubmit} className='font-body'>
        <Autocomplete
          id='search-bar'
          options={combinedData()}
          groupBy={option => option.category}
          getOptionLabel={option => option.name}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          sx={{ width: '100%' }}
          renderOption={(props, option) => (
            <li
              {...props}
              key={option.key}
              className='flex items-center p-2 rounded-md cursor-pointer font-body'
              onClick={() => handleOptionClick(option)}
            >
              <FontAwesomeIcon icon={option.icon} className='mr-2' />
              <span>{option.name}</span>
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Search by Product Type or Vendor'
              className='bg-gray-100 border-4 border-border shadow-md font-body'
              sx={{
                borderRadius: '9999px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '9999px',
                  border: '2px solid #564225',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#e2e7de',
                  transform: 'translate(16px, -20px) scale(0.75)',
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
              inputRef={inputRef}
            />
          )}
        />
      </form>
    </div>
  );
};

export default SearchBar;
