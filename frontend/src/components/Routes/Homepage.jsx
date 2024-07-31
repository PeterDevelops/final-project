import React from 'react';
import NavBar from '../NavBar';
import Map from '../Map'
import Login from '../../Login'


const Homepage = (props) => {
  const { products, vendors, locations, categories } = props;
  return (
    <div>
      <NavBar products={products} vendors={vendors} locations={locations} categories={categories} />
      <Login/>
      <Map
        center={[49.2824, -122.8277]}
        zoom={12}
        className='h-50vh w-80vw mx-auto border-2 border-custom-gray shadow-md rounded-lg'
      />
    </div>

  );

};

export default Homepage;
