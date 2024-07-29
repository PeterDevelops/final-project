import React from 'react'
import NavBar from './NavBar';
import Map from './Map'
import ProductList from './Body/ProductList'
import VendorList from './Body/VendorList'

const Homepage = (props) => {
  const { products, vendors } = props;
  return (
    <div>
      <NavBar products={products} vendors={vendors}/>
      <Map
        center={[49.2824, -122.8277]}
        zoom={12}
        className = 'h-50vh w-80vw mx-auto border-2 border-custom-gray shadow-md rounded-lg'
      />
      {/* <ProductList products={products}/> */}
      {/* <VendorList vendors={vendors} /> */}
    </div>

  )

};

export default Homepage;
