import React from 'react'
import NavBar from './NavBar';
import ProductList from './Body/ProductList'

const Homepage = (props) => {
  const { products } = props;
  return (
    <div>
      <NavBar />
      <ProductList products={products}/>
    </div>

  )

};

export default Homepage;