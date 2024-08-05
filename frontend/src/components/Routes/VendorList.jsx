import React from 'react'
import VendorListItem from '../Body/VendorListItem';
import NavBar from '../NavBar';

const VendorList = (props) => {
  const {
    vendors,
    products,
    setProducts,
    allProducts,
    locations,
    categories,
    user,
    setUser
  } = props;

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
      <NavBar
        products={products}
        setProducts={setProducts}
        allProducts={allProducts}
        vendors={vendors}
        locations={locations}
        categories={categories}
        user={user}
        setUser={setUser}
      />
      {vendorListArr()}
    </div>
  );
};

export default VendorList;
