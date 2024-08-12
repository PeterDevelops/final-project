import NavBar from '../NavBar';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderConfirmation = ({ products, vendors, locations, user, setUser, cartItems, }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = user?.id;
  const orderId = location.state?.orderId;
  // console.log('OrderConfirmation:user:', user);

  useEffect(() => {
    if (orderId) {
      axios.get(`/api/orders/order/${orderId}`)
        .then(response => {
          setOrderDetails(response.data);
          console.log('OrderConfirmation:response.data:', response.data);
        })
        .catch(err => {
          console.error('Error retrieving order details', err);
        });
    }
  }, [orderId]);


  // useEffect(() => {
  //   if (userId) {
  //     axios.get(`/api/orders/${userId}`)
  //       .then(response => {
  //         setOrderDetails(response.data);
  //         console.log('OrderConfirmation:response.data:', response.data);
  //       })
  //       .catch(err => {
  //         console.error('Error retrieving order details', err);
  //       });
  //   }
  // }, [userId]);

  if (!Array.isArray(orderDetails)) {
    return <div>Loading order details...</div>;
  }

  const totalAmount = orderDetails.reduce(
    (sum, item) => sum + item.quantity * item.price_cents / 100,
    0);
  // console.log('OrderConfirmation:totalAmount:', totalAmount);
  // console.log('OrderConfirmation:order_id:', orderDetails[0].order_id)

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md -mt-10'>
      {/* <NavBar products={products} vendors={vendors} locations={locations} user={user} setUser={setUser} cartItems={cartItems} /> */}
      <div className='mb-2'>
        <div className='text-xl font-semibold text-gray-800'>
          Thank you for your order, {user.name}!
        </div>
        <p className='text-gray-600 mt-2'>Your order has been placed successfully.</p>
      </div>

      <div className='mb-2'>
        <h2 className="text-xl font-semibold text-gray-700">Order Details</h2>
        <div>
          <p className='text-gray-600 mt-1'>Order ID: <span className='font-semibold text-gray-800'>{orderDetails[0].order_id}</span></p>
        </div>
      </div>

      <div className='mb-2'>
        <h3 className='text-lg font-semibold text-gray-700'>Items Purchased</h3>
        <div className='flex items-center justify-end border-b pb-4 mt-2'>
          <span>Name</span>
          <span className='mx-8'>Quantity</span>
          <span className='mr-2'>Price</span>
        </div>
        <ul className='mt-4 space-y-4'>
          {orderDetails.map(item => (
            <li key={item.product_id} className='flex items-center justify-between border-b pb-4'>
              <div className='flex items-center w-24'>
                <img
                  src={item.product_photo_url}
                  alt={item.product_name}
                  className='w-11 h-11 rounded-md mr-4'
                />
                <p className="text-sm font-semibold text-gray-800">{item.product_name}</p>
              </div>
              <p className='text-sm'>{item.quantity}</p>
              <p className='text-sm'>${(item.price_cents * item.quantity / 100).toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <div className='text-right mt-2'>
          <h3 className='text-lg font-semibold text-gray-700'>Total Amount: ${(totalAmount).toFixed(2)}</h3>
        </div>
      </div>
      <div className='mt-4 text-center'>
        <button className='px-6 py-2 bg-blue-600 text-white rounded-md shadow' onClick={() => navigate('/')}>Back to home page</button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
