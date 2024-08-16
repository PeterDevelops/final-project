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

/**
 * SearchBar component allows users to search for products or vendors.
 *
 * @param {Object} props - The component's props.
 * @param {Function} props.setProducts - Function to update the list of products based on search.
 * @param {Array} props.allProducts - Array of all available products.
 * @param {Function} props.setVendors - Function to update the list of vendors based on search.
 * @param {Array} props.allVendors - Array of all available vendors.
 *
 * @returns {JSX.Element} - The rendered SearchBar component.
 */
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

  /**
   * Gets the icon associated with a given category.
   *
   * @param {string} category - The category name.
   * @returns {Object|null} - The FontAwesome icon for the category, or null if not found.
   */
  const getIconForCategory = (category) => {
    const icons = {
      Vegetable: faSeedling,
      Fruit: faAppleWhole,
      Meat: faDrumstickBite,
      Miscellaneous: faBreadSlice,
      Vendor: faStore
    };
    return icons[category] || null;
  };

  /**
   * Categorizes products by sub-category.
   *
   * @returns {Array} - Array of categorized products with unique sub-categories.
   */
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

  /**
   * Categorizes vendors with a default category and icon.
   *
   * @returns {Array} - Array of vendors categorized with a default icon.
   */
  const categorizeVendors = () => {
    if (!Array.isArray(allVendors) || !allVendors.length) return [];

    return allVendors.map(vendor => ({
      ...vendor,
      key: vendor.id,
      category: 'Vendor',
      icon: getIconForCategory('Vendor'),
    }));
  };

  /**
   * Combines and sorts product and vendor data.
   *
   * @returns {Array} - Combined and sorted array of categorized products and vendors.
   */
  const combinedData = () => {
    const productData = categorizeProducts();
    const vendorData = categorizeVendors();
    return [...productData, ...vendorData].sort((a, b) => a.category.localeCompare(b.category));
  };

  /**
   * Handles click events on autocomplete options.
   *
   * @param {Object} option - The selected option from the autocomplete.
   */
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
      navigate('/products', { state: { allProducts } });
    }
  };

  /**
   * Handles form submission and redirects based on input value.
   *
   * @param {Object} event - The form submission event.
   */
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

  /**
   * Handles changes to the input field and updates filtered options.
   *
   * @param {Object} event - The input change event.
   * @param {string} newInputValue - The new input value.
   */
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
              className='flex items-center p-2 rounded-md cursor-pointer font-body'
              onClick={() => handleOptionClick(option)}
              key={option.key}
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
