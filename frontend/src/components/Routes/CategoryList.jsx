import React from 'react';
import NavBar from '../NavBar';
import { useNavigate } from 'react-router-dom';

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
    setUser
  } = props;

  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
      const filteredByCategory = allProducts.filter(product => product.category === category);
      setProducts(filteredByCategory);
      navigate('/products', { state: { allProducts, allVendors } });
  };

  const categoryListArr = () => {
    if (Array.isArray(categories) && categories.length > 0) {
      console.log("categories:", categories);
      return categories.map((category, index) => (
        <div
          key={index}
          className="category-item cursor-pointer"
          onClick={() => handleCategoryClick(category.category)}
        >
          {category.category}
        </div>
      ));
    }
  };

  return (
    <div>
      <NavBar
        products={products}
        setProducts={setProducts}
        allProducts={allProducts}
        vendors={vendors}
        setVendors={setVendors}
        allVendors={allVendors}
        locations={locations}
        categories={categories}
        user={user}
        setUser={setUser}
      />
      <div className="grid gap-5 grid-cols-2 grid-rows-2">
        {categoryListArr()}
      </div>
    </div>
  );
};

export default CategoryList;
