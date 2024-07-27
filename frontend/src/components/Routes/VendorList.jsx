import React from 'react'
import VendorListItem from '../Body/VendorListItem';
import NavBar from '../NavBar';

const VendorList = ( props ) => {
  const { vendors } = props;

  // if statement required to not throw TypeError: products.map is not a function
  const vendorListArr = () => {
    if (vendors.length > 0) {
      console.log("vendor list items:", vendors);
      return vendors.map((vendor) => (
      <VendorListItem key={vendor.id} vendorData={vendor}/>
      ));
    }
  };

  return (
    <div className="flex flex-wrap">
      <NavBar />
      {vendorListArr()}
    </div>
  );
};

export default VendorList;
