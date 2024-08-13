import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSeedling,
  faAppleWhole,
  faDrumstickBite,
  faBreadSlice
} from '@fortawesome/free-solid-svg-icons';

const CategoryList = (props) => {
  const {
    vendors,
    setVendors,
    allVendors,
    products,
    setProducts,
    allProducts,
    locations,
    categories,
    user,
    setUser,
    cartItems,
  } = props;

  const navigate = useNavigate();

  const getIconForCategory = (category) => {
    switch (category) {
      case 'Vegetable':
        return faSeedling;
      case 'Fruit':
        return faAppleWhole;
      case 'Meat':
        return faDrumstickBite;
      case 'Miscellaneous':
        return faBreadSlice;
      default:
        return null;
    }
  };

  const handleCategoryClick = (category) => {
      const filteredByCategory = allProducts.filter(product => product.category === category);
      setProducts(filteredByCategory);
      navigate('/products', { state: { allProducts, allVendors } });
  };

  const categoryListArr = () => {
    if (Array.isArray(categories) && categories.length > 0) {
      const categoryOrder = {
        'Fruit': 1,
        'Vegetable': 2,
        'Meat': 3,
        'Miscellaneous': 4
      };
      const sortedCategories = [...categories].sort((a, b) => {
        return (categoryOrder[a.category] || Number.MAX_VALUE) - (categoryOrder[b.category] || Number.MAX_VALUE);
      });
      return sortedCategories.map((category, index) => (
        <div
          key={index}
          className="relative flex items-center justify-center cursor-pointer border rounded-lg shadow-md p-20 m-4 md:m-6 lg:m-8 hover:bg-gray-100 hover:scale-105 transition-transform duration-300"
          onClick={() => handleCategoryClick(category.category)}
        >
          <FontAwesomeIcon
            icon={getIconForCategory(category.category)}
            className="text-9xl text-gray-500"
          />
          <span
            className="absolute text-white text-xl font-bold z-10 text-shadow-outline"
          >
            {category.category}
          </span>
        </div>
      ));
    }
  };

  return (
    <div className="min-h-screen">
      <div className="grid gap-4 md:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {categoryListArr()}
      </div>
    </div>
  );
};

export default CategoryList;
