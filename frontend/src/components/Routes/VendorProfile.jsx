import React from 'react';
import NavBar from '../NavBar';
import axios from 'axios'
import ProductList from './ProductList';
import { useNavigate } from 'react-router-dom';

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
  const vendor = vendors.length > 0 ? vendors[0] : null;

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
            navigate('/vendors', { state: { allVendors }});
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


  const handleNavigateToChat = () => {
    //check chats table for user.id && contact_user_id (vendor.id) & return CHAT IF EXISTS
    console.log("user id", user.id)
    console.log("vendor id", vendor.id)

    axios.get('/api/chats/', {params: {userId: user.id, vendorId: vendor.id}})
    .then(chatObj => { 
      console.log("CHATOBJ---", chatObj.data[0].chat.length);
        const chatResults = chatObj.data[0].chat[0];
        console.log("CHAT RESULTS-----", chatResults)
        const vendorResults = chatObj.data[0].vendor;
        console.log("VENDOR RESULTS-----", vendorResults)
      if (chatResults.id) {
        console.log("chat results aren't 0")
        navigate(`/chats/${chatResults.id}`, { state: {chat: vendorResults}})
      } else {
        axios.post('/api/chats/new', {userId: user.id, vendorUserId: vendorResults.vendor_user_id})
        .then((results) => { 
          console.log("HOSHDFOISHDF", results)
          navigate(`/chats/${vendorResults.id}`, { state: {chat: results.data}})}
        )
      }
  
    })
    .catch((err) => {console.log("Find a chat axios error:", err)})
  
    //if result.length = 1
      //navigate to that chats/chats.id
    //if result.length > 1 then
      //axois? create a new chat and return it
      //navigate to that chats/chat.id
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
          {/* button to navigate to temporary fake chat */}
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
    </div>
  );
};

export default VendorProfile;
