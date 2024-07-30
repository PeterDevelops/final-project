import React from 'react'
import ProductListItem from '../Body/ProductListItem'
import NavBar from '../NavBar';

const ProductList = (props) => {
  const { vendors, products, locations } = props;

  // if statement required to not throw TypeError: products.map is not a function
  const productListArr = () => {
    if (Array.isArray(products) && products.length > 0) {
      console.log("product list items:", products)
      return products.map((product) => (
        <ProductListItem key={product.id} productData={product} />
      ));
    }
  };

  return (
    <div>
      <NavBar products={products} vendors={vendors} locations={locations} />
      <div className="flex flex-wrap">
        {productListArr()}
      </div>
    </div>
  )

};

export default ProductList;
