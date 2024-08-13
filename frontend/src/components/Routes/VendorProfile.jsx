import React from 'react';
import { useEffect, useState } from 'react'
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

  useEffect(() => {
    if (location.state.vendor) {
      setVendor(location.state.vendor)
    } else {
      const vendorData = vendors[0];
      setVendor(vendorData)
    }
  }, [location.state.vendor, vendors])

  useEffect(() => {
    if (location.state.allProducts && vendor) {
      const listOfProducts = location.state.allProducts
      const vendorsProducts = listOfProducts.filter((product) => product.vendor_id === vendor.id)
      setAllProducts(location.state.allProducts);
      setProducts(vendorsProducts)
    }
  }, [location.state.allProducts, vendor])

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

  const handleNavigateToChat = () => {
    if (user) {
      axios.get('/api/chats/', { params: { userId: user.id, vendorId: vendor.id } })
        .then(chatObj => {
          const chatResults = chatObj.data[0].chat;
          const vendorResults = chatObj.data[0].vendor;
          if (chatResults.length > 0) {
            navigate(`/chats/${chatResults[0].id}`, { state: { chat: vendorResults, vendor: vendor, allProducts: allProducts } })
          } else {
            axios.post('/api/chats/new', { userId: user.id, vendorUserId: vendorResults.vendor_user_id })
              .then((results) => {
                navigate(`/chats/${results.data.id}`, { state: { chat: { contact_name: vendor.name, contact_photo: vendor.vendor_logo_url, vendor: vendor }, allProducts: allProducts } })
              }
            )
          }
        })
        .catch((err) => { console.log('Find a chat axios error:', err) })
    } else {
      navigate('/inbox')
    }
  }

  return (
    <div>
      {vendor &&
        <>

          <div className='vendor-profile flex flex-col items-center rounded-lg m-5 overflow-hidden'>
            <div className='relative w-80 h-80'>
            <img src={vendor.vendor_logo_url} alt={vendor.name} className='object-cover object-center border shadow rounded-full w-full h-full' />
            </div>
            <div className='p-5 w-full md:w-2/3 mx-auto'>
              <h3 className='text-xl font-semibold text-center'>{vendor.name}</h3>
              <p className='mt-2 text-center'>{vendor.bio}</p>
              {user && user.id === vendor.admin_user ? (
                <div className='mt-4 flex justify-center'>
                  <button
                    onClick={handleEdit}
                    className='bg-blue-500 text-white py-2 px-4 rounded mr-2'
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className='bg-red-500 text-white py-2 px-4 rounded'
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div className='mt-4 flex justify-center'>
                  <button
                    onClick={handleNavigateToChat}
                    className='bg-green-500 text-white py-2 px-4 rounded text-sm'
                  >
                    Contact Vendor
                  </button>
                </div>
              )}
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
