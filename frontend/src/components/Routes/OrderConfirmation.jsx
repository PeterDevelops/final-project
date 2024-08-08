import NavBar from '../NavBar';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderConfirmation = ( { products, vendors, locations, user, setUser } ) => {
  // const [orderDetails, setOrderDetails] = useState([]);
  const navigate = useNavigate();
  // const userId = user.id;
  // useEffect(() => {
  //   axios.get(`/api/orders/${userId}`)
  //   .then(response => {
  //     setOrderDetails(response.data);
  //     console.log('OrderConfirmation:orderDetails:', orderDetails);
  //   })
  //   .catch(err => {
  //     console.error('Error retrieving order details', err);
  //   })
  // }, []);

  return(
    <div>
      <NavBar products={products} vendors={vendors} locations={locations} user={user} setUser={setUser} />
      <div>Thank you for your order.</div>

      <div>
      <div>Order Details</div>

      </div>

      <button onClick={() => navigate('/')}>Go back to home page</button>
    </div>
  )
}

export default OrderConfirmation;
