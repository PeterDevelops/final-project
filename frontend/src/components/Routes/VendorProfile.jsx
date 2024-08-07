import React, { useEffect } from 'react';
import NavBar from '../NavBar';
import ProductList from './ProductList';
import { useParams } from 'react-router-dom';

const VendorProfile = (props) => {
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

  const { vendorId } = useParams();

  useEffect(() => {
    if (vendorId && allVendors.length > 0) {
      const currentVendor = allVendors.find(vendor => vendor.id === parseInt(vendorId));
      const filteredProducts = allProducts.filter(product => product.vendor_id === parseInt(vendorId));

      if (currentVendor) {
        setVendors([currentVendor]);
        setProducts(filteredProducts);
      }
    }
  }, [vendorId, allVendors, allProducts, setVendors, setProducts]);

  const vendor = vendors[0];

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
      <div className="vendor-profile flex flex-col md:flex-row md:items-center border rounded-lg shadow-md m-5 overflow-hidden">
        <img src={vendor.vendor_logo_url} alt={vendor.name} className="w-full md:w-1/3 md:object-cover md:object-contain"/>
        <div className="p-5 w-full md:w-2/3">
          <h3 className="text-xl font-semibold">{vendor.name}</h3>
          <p className="mt-2">{vendor.bio}</p>
        </div>
      </div>
      <ProductList
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
                showNavBar={false}
      />
    </div>
  );
};

export default VendorProfile;
