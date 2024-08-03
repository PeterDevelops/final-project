import React from 'react';
import NavBar from '../NavBar';
import Map from '../Map'
import Login from './Login'


const Homepage = (props) => {
  const { products, setProducts, vendors, locations, categories, user, setUser } = props;
  return (
    <div>
      <NavBar products={products} setProducts={setProducts} vendors={vendors} locations={locations} categories={categories} user={user} setUser={setUser}/>
      <Map
        locations={locations}
        zoom={10}
        className='h-50vh w-80vw mx-auto border-2 border-custom-gray shadow-md rounded-lg'
      />
    </div>

  );

};

export default Homepage;
