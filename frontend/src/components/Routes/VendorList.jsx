import React from 'react'
import VendorListItem from '../Body/VendorListItem';
import NavBar from '../NavBar';

const VendorList = (props) => {
  const { vendors, products, locations, categories } = props;

  // if statement required to not throw TypeError: products.map is not a function
  const vendorListArr = () => {
    if (Array.isArray(vendors) && vendors.length > 0) {
      // console.log("vendor list items:", vendors);
      return vendors.map((vendor) => (
        <VendorListItem key={vendor.id} vendorData={vendor} />
      ));
    }
  };

  return (
    <div>
      <NavBar products={products} vendors={vendors} locations={locations} categories={categories} />
      {vendorListArr()}
    </div>
  );
};

export default VendorList;
