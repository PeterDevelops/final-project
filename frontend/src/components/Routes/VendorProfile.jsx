import React from 'react';
import NavBar from '../NavBar';
//useParams hook to include vendorId in URL
import { useParams } from 'react-router-dom';

const VendorProfile = (props) => {
  const { vendors, products, setProducts, allProducts, locations, categories, user, setUser } = props;
  const { vendorId } = useParams();

  //iterate over vendors array to check if vendor id matches vendorId integer
  const vendor = vendors.find(v => v.id === parseInt(vendorId));

  return (
    <div>
      <NavBar products={products} setProducts={setProducts} allProducts={allProducts} vendors={vendors} locations={locations} categories={categories} user={user} setUser={setUser}/>
      <div className="vendor-profile">
        <img src={vendor.vendor_logo_url} alt={vendor.name} />
        <h2>{vendor.name}</h2>
        <p>{vendor.bio}</p>
      </div>
    </div>
  );
};

export default VendorProfile;
