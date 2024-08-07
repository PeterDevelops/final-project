import React from 'react'
import ProductListItem from '../Body/ProductListItem'
import NavBar from '../NavBar';

const ProductList = (props) => {
  const {
    vendors,
    products,
    setProducts,
    allProducts,
    locations,
    categories,
    user,
    setUser,
    cartItems,
    setCartItems
  } = props;

  // if statement required to not throw TypeError: products.map is not a function
  const productListArr = () => {
    if (Array.isArray(products) && products.length > 0) {
      return products.map((product) => (
        <ProductListItem key={product.id} productData={product} vendors={vendors} cartItems={cartItems} setCartItems={setCartItems} />
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
        locations={locations}
        categories={categories}
        user={user}
        setUser={setUser}
      />
      {productListArr()}
    </div>
  )

};

export default ProductList;
