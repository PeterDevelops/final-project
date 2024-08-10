import React from 'react'
import ProductListItem from '../Body/ProductListItem'
import NavBar from '../NavBar';

const ProductList = (props) => {
  const {
    vendors,
    setVendors,
    allVendors,
    products,
    setProducts,
    allProducts,
    setAllProducts,
    locations,
    categories,
    user,
    setUser,
    cartItems,
    setCartItems,
    quantities,
    setQuantities,
    showNavBar = true,
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
      {/* {showNavBar && (
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
        cartItems={cartItems}
      />
      )} */}
      <div className="grid grid-cols-2 gap-4">
      {productListArr()}
      </div>
    </div>
  )

};

export default ProductList;
