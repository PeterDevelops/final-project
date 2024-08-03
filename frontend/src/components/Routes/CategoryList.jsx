import React from 'react';
import NavBar from '../NavBar';

const CategoryList = (props) => {
  const { vendors, products, setProducts, allProducts, locations, categories, user, setUser } = props;

  const categoryListArr = () => {
    if (Array.isArray(categories) && categories.length > 0) {
      console.log("categories:", categories);
      return categories.map((category, index) => (
        <div key={index} className="category-item">
          {category.category}
        </div>
      ));
    }
  };

  return (
    <div>
      <NavBar products={products} setProducts={setProducts} allProducts={allProducts} vendors={vendors} locations={locations} categories={categories} user={user} setUser={setUser}/>
      <div className="grid gap-5 grid-cols-2 grid-rows-2">
        {categoryListArr()}
      </div>
    </div>
  );
};

export default CategoryList;
