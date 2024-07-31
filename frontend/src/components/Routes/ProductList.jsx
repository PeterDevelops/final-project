import React from 'react'
import ProductListItem from '../Body/ProductListItem'
import NavBar from '../NavBar';

const ProductList = (props) => {
  const { vendors, products, locations, categories } = props;

  // if statement required to not throw TypeError: products.map is not a function
  const productListArr = () => {
    if (Array.isArray(products) && products.length > 0) {
      // console.log("product list items:", products)
      return products.map((product) => (
        <ProductListItem key={product.id} productData={product} />
      ));
    }
  };

  return (
    <div>
      <NavBar products={products} vendors={vendors} locations={locations} categories={categories}/>
      {productListArr()}
    </div>
  )

};

export default ProductList;
