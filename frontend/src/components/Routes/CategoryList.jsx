import React from 'react';
import NavBar from '../NavBar';

const CategoryList = (props) => {
  const { vendors, products, locations, categories } = props;

  const categoryListArr = () => {
    if (Array.isArray(categories) && categories.length > 0) {
      console.log("categories:", categories);
      return categories.map((category, index) => (
        <div key={index} className="category-item">
          {category.category}
        </div>
      ));
    } else {
      return <p>No categories available</p>;
    }
  };

  return (
    <div>
      <NavBar products={products} vendors={vendors} locations={locations} categories={categories} />
      <div className="grid gap-5 grid-cols-2 grid-rows-2">
        {categoryListArr()}
      </div>
    </div>
  );
};

export default CategoryList;
