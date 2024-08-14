import React from 'react'
import ProductListItem from '../Body/ProductListItem'

const ProductList = (props) => {
  const {
    vendors,
    allVendors,
    products,
    allProducts,
    setAllProducts,
    user,
    cartItems,
    setCartItems,
    quantities,
    setQuantities,
  } = props;

  // if statement required to not throw TypeError: products.map is not a function
  const productListArr = () => {
    if (Array.isArray(products) && products.length > 0) {
      return products.map((product) => (
        <ProductListItem
          key={product.id}
          productData={product}
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          user={user}
          allVendors={allVendors}
          vendors={vendors}
          cartItems={cartItems}
          setCartItems={setCartItems}
          setQuantities={setQuantities}
          quantities={quantities}
        />
      ));
    }
  };

  return (
    <div className='min-h-screen'>
      <div className='grid grid-cols-2 gap-1 mt-3'>
      {productListArr()}
      </div>
    </div>
  )

};

export default ProductList;
