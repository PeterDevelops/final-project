import React from 'react'
import ProductListItem from './ProductListItem'

const ProductList = (props) => {
  const { products } = props;

  // if statement required to not throw TypeError: products.map is not a function
  const productListArr = () => {
    if (products.length > 0) {
      return products.map((product) => <ProductListItem key={product.id} productData={product}/>)
    }
  }

  return (
    <div className="flex flex-wrap">
      {productListArr()}
    </div>

  )

};

export default ProductList;