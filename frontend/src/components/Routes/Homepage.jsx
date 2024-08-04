import React from 'react';
import NavBar from '../NavBar';
import Map from '../Map'


const Homepage = (props) => {
  const { products, vendors, locations, categories, user, setUser } = props;
  return (
    <div>
      <NavBar products={products} vendors={vendors} locations={locations} categories={categories} user={user} setUser={setUser}/>
      <Map
        center={[49.2824, -122.8277]}
        zoom={12}
        className='h-50vh w-80vw mx-auto border-2 border-custom-gray shadow-md rounded-lg mt-10'
      />
    </div>

  );

};

export default Homepage;
