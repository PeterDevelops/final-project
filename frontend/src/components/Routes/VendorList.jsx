import React from 'react'
import VendorListItem from '../Body/VendorListItem';
import NavBar from '../NavBar';
import { useNavigate } from 'react-router-dom'

const VendorList = (props) => {
  const {
    vendors,
    setVendors,
    allVendors,
    products,
    setProducts,
    allProducts,
    locations,
    categories,
    user,
    setUser
  } = props;

  const navigate = useNavigate();

  const handleVendorClick = (vendor) => {
    const filteredByVendor = allProducts.filter(product => product.vendor_id === vendor.id);
    const currentVendor = vendor;

    setProducts(filteredByVendor);
    setVendors([currentVendor]);
    navigate(`/vendors/${currentVendor.id}`, { state: { allProducts, allVendors } });
  };

  // if statement required to not throw TypeError: products.map is not a function
  const vendorListArr = () => {
    if (Array.isArray(allVendors) && vendors.length > 0) {
      // console.log("vendor list items:", vendors);
      return allVendors.map((vendor) => (
        <VendorListItem key={vendor.id} vendorData={vendor} onClick={() => handleVendorClick(vendor)} />

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
        setVendors={setVendors}
        allVendors={allVendors}
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
