import React from 'react';
import NavBar from './NavBar';
import Map from './Map';
import ProductList from './Body/ProductList';
import { useLocation } from 'react-router-dom';

const Homepage = (props) => {
  const { products } = props;

  const location = useLocation();
  // location.pathname returns a string of the current path
  console.log('location:', location.pathname);

  return (
    <div>
      <NavBar />

        <Map
          center={[49.2824, -122.8277]}
          zoom={12}
          className='h-50vh w-80vw mx-auto border-2 border-custom-gray shadow-md rounded-lg'
        />

      {/* <ProductList products={products}/> */}
    </div>

  );

};

export default Homepage;
