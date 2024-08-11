import React from 'react';
import { useEffect, useState } from 'react'
import NavBar from '../NavBar';
import axios from 'axios'
import ProductList from './ProductList';
import { useNavigate, useLocation } from 'react-router-dom';

const VendorProfile = (props) => {
  const {
    vendors,
    setVendors,
    allVendors,
    setAllVendors,
    products,
    setProducts,
    allProducts,
    setAllProducts,
    locations,
    categories,
    user,
    setUser,
    cartItems,
    setCartItems,
    setQuantities
  } = props;

  const navigate = useNavigate();
  const [vendor, setVendor] = useState({});

  //from chat
  const location = useLocation();
  // console.log("location is always true, even without assignment", location.state.vendor)
  console.log("vendorData", vendors[0])

  useEffect(() => {
    if (location.state.vendor) {
      // console.log("location is always true, even without assignment", location.state.vendor)
      setVendor(location.state.vendor)
    } else {
      // const vendorData = vendors.length > 0 ? vendors[0] : null;
      const vendorData = vendors[0];
      console.log("VENDOR DATA&&&&&&&", vendorData)
      setVendor(vendorData)
    }
  }, [location.state.vendor, vendors])

  useEffect(() => {
    console.log("all products back in vendor profile", location.state.allProducts)
    if (location.state.allProducts && vendor) {
      const listOfProducts = location.state.allProducts
      console.log("listOfProducts", listOfProducts)
      console.log("vendor", vendor)
      console.log("vendor ID", listOfProducts[0].vendor_id)
      const vendorsProducts = listOfProducts.filter((product) => product.vendor_id === vendor.id )
      console.log("Vendors products back on the vendors page", vendorsProducts)
      setAllProducts(location.state.allProducts);
      setProducts(vendorsProducts)
    }
  }, [location.state.allProducts, vendor])

  // const vendorFromChat = location.state?.vendor || {};


  // const vendor = vendors.length > 0 ? vendors[0] : null;

  const handleEdit = () => {
    if (vendor) {
      navigate(`/vendors/edit/${vendor.id}`, { state: { vendor } });
    }
  };

  const handleDelete = () => {
    if (vendor) {
      const confirmed = window.confirm('Are you sure you want to delete this vendor?');
      if (confirmed) {
        fetch(`/api/vendors`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: vendor.id }),
        })
          .then(response => {
            if (response.ok) {
              setAllVendors(allVendors.filter(v => v.id !== vendor.id));
              navigate('/vendors', { state: { allVendors } });
            } else {
              console.error('Failed to delete vendor');
            }
          })
          .catch(err => {
            console.error('Error deleting vendor:', err.message);
          });
      }
    }
  };

  /**
   * chatObj {
    chat: [],
    vendor: {
      contact_name: 'Artisan Cheese Co.',
      contact_photo: '/images/vendor-logos/artisan-cheese-co-high-resolution-logo.png',
      vendor_id: 5,
      vendor_user_id
    }
  }
  [ '5' ]
    * 
   */

  console.log("VENDOR FROM STATE", vendor)
  console.log("ALL PRODUCTS", allProducts)

  const handleNavigateToChat = () => {
    //check chats table for user.id && contact_user_id (vendor.id) & return CHAT IF EXISTS
    // console.log("user id", user.id)
    // console.log("vendor id", vendor.id)
    axios.get('/api/chats/', { params: { userId: user.id, vendorId: vendor.id } })
      .then(chatObj => {
        // console.log("CHATOBJ---", chatObj);
        const chatResults = chatObj.data[0].chat;
        // console.log("CHAT RESULTS-----", chatResults)
        const vendorResults = chatObj.data[0].vendor;
        // console.log("VENDOR RESULTS-----", vendorResults)
        if (chatResults.length > 0) {
          // console.log("chat results aren't 0")
          navigate(`/chats/${chatResults[0].id}`, { state: { chat: vendorResults, vendor: vendor, allProducts: allProducts } })
        } else {
          // console.log("chat results are 0")
          axios.post('/api/chats/new', { userId: user.id, vendorUserId: vendorResults.vendor_user_id })
            .then((results) => {
              // console.log("HOSHDFOISHDF", results)
              navigate(`/chats/${results.data.id}`, { state: { chat: { contact_name: vendor.name, contact_photo: vendor.vendor_logo_url, vendor: vendor }, allProducts: allProducts }})
            }
            )
        }

      })
      .catch((err) => { console.log("Find a chat axios error:", err) })

  }


  return (
    <div>
      {/* <NavBar
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
        cartItems={cartItems}
      /> */}
      {vendor &&
        <>
          <div className="vendor-profile flex flex-col md:flex-row md:items-center border rounded-lg shadow-md m-5 overflow-hidden">
            <img src={vendor.vendor_logo_url} alt={vendor.name} className="w-full md:w-1/3 md:object-cover md:object-contain" />
            <div className="p-5 w-full md:w-2/3">
              <h3 className="text-xl font-semibold">{vendor.name}</h3>
              <p className="mt-2">{vendor.bio}</p>
              {user && user.id === vendor.admin_user && (
                <div className="mt-4">
                  <button
                    onClick={handleEdit}
                    className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
              <div className="mt-4">
                <button
                  onClick={handleNavigateToChat}
                  className="bg-green-500 text-white py-2 px-4 rounded"
                >
                  Message Vendor
                </button>
              </div>
            </div>
          </div>
          <ProductList
            products={products}
            setProducts={setProducts}
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            vendors={vendors}
            setVendors={setVendors}
            allVendors={allVendors}
            locations={locations}
            categories={categories}
            user={user}
            setUser={setUser}
            showNavBar={false}
            cartItems={cartItems}
            setCartItems={setCartItems}
            setQuantities={setQuantities}
          />

        </>
      }
    </div>
  );
};

export default VendorProfile;
