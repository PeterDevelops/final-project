import React from 'react'
import ProductListItem from './ProductListItem'

const ProductList = (props) => {
  const { products } = props;
  console.log("products: ", products);

  const productListArr = products.map((product) => <ProductListItem key={product.id} productData={product}/> )
  return (
    <div class="flex flex-wrap">
      {productListArr}
    </div>

  )

};

export default ProductList;