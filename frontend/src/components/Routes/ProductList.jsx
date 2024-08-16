import React from 'react';
import ProductListItem from '../Body/ProductListItem';

/**
 * ProductList component displays a list of products.
 *
 * @param {Object} props - Component props
 * @param {Array} props.products - Array of products to be displayed
 * @param {Array} props.allProducts - Array of all products available
 * @param {Function} props.setAllProducts - Function to update the allProducts array
 * @param {Array} props.vendors - Array of vendors related to the products
 * @param {Array} props.allVendors - Array of all vendors available
 * @param {Object} props.user - Current user object
 * @param {Array} props.cartItems - Array of items currently in the cart
 * @param {Function} props.setCartItems - Function to update the cart items
 * @param {Object} props.quantities - Object storing quantities of items in the cart
 * @param {Function} props.setQuantities - Function to update quantities of items in the cart
 * @returns {JSX.Element} The rendered ProductList component
 */
const ProductList = (props) => {
  const {
    products,
    allProducts,
    setAllProducts,
    vendors,
    allVendors,
    user,
    cartItems,
    setCartItems,
    quantities,
    setQuantities,
  } = props;

  /**
   * Generates an array of ProductListItem components.
   * The function ensures that products are mapped only if they exist and are in array format.
   *
   * @returns {JSX.Element[]} Array of ProductListItem components
   */
  const productListArr = () => {
    // Ensure products is an array and contains at least one item
    if (Array.isArray(products) && products.length > 0) {
      return products.map((product) => (
        <ProductListItem
          key={product.id} // Unique key for each product item
          productData={product} // Data for the individual product
          allProducts={allProducts} // Array of all products
          setAllProducts={setAllProducts} // Function to update all products
          user={user} // Current user information
          vendors={vendors} // Array of vendors
          allVendors={allVendors} // Array of all vendors
          cartItems={cartItems} // Items currently in the cart
          setCartItems={setCartItems} // Function to update cart items
          quantities={quantities} // Quantities of items in the cart
          setQuantities={setQuantities} // Function to update quantities
        />
      ));
    }
  };

  return (
    <div className='min-h-screen'>
      {/* Container for product grid */}
      <div className='grid grid-cols-2 gap-1 mt-3'>
        {/* Render the array of ProductListItem components */}
        {productListArr()}
      </div>
    </div>
  );
};

export default ProductList;
