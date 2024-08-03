import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../NavBar';
import '../../styles/Cart.scss';
import DeliveryToggle from '../Body/DeliveryToggle';
import CartListItem from '../Body/CartListItem';
import axios from 'axios';

const Checkout = ({ products, vendors, locations, user, setUser, cartItems, totalCost }) => {
  // change logic
  const userId = 1;

  console.log('cartItems:', cartItems);

  const navigate = useNavigate();

  const [alignment, setAlignment] = useState('pickup');
  const [deliveryDetails, setDeliveryDetails] = useState({
    address: '',
    city: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handlePayment = () => {
    const orderData = {
      user_id: userId,
      total_cost: totalCost,
      delivery_type: alignment,
      delivery_address: alignment === 'delivery' ? deliveryDetails.address : '',
      delivery_city: alignment === 'delivery' ? deliveryDetails.city : ''
    };

    const orderItems = cartItems.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity
    }));

    axios.post('/api/orders', { orderData, orderItems })
      .then(response => {
        console.log('Order and order items created successfully:', response.data);
        // delete cart item after order completion
        return axios.delete(`/api/cart/${userId}`);
      })
      .then(() => {
        console.log('Cart and cart item deleted successfully');
        navigate('/order-confirmation');
      })
      .catch(error => {
        console.error('There was an error creating the order!', error);
      });
  };


  return (

    <div>
      <NavBar products={products} vendors={vendors} locations={locations} user={user} setUser={setUser} />

    {cartItems.length > 0 ? (

      <div className='cart-container'>

        <div className='cart-center'>
          <DeliveryToggle alignment={alignment} setAlignment={setAlignment} />
        </div>

        <div>
          Order Summary
        </div>

        {cartItems.map(item => (
          <CartListItem
            key={item.order_item_id}
            product_photo_url={item.product_photo_url}
            product_name={item.product_name}
            quantity={item.quantity}
            price_cents={item.price_cents}
          />
        ))}

        <div className='total'>
          Total: ${totalCost / 100}
        </div>

        {/* if pickup render vendor address and city */}
        {alignment === 'pickup' && (
          <div>
            <h3>Pickup Address</h3>
            {cartItems.length > 0 ? (
              <p>{cartItems[0].vendor_address}, {cartItems[0].vendor_city}</p>
            ) : (
              <p>Address and city information not available.</p>
            )}
          </div>
        )}

        {/* if delivery render form */}
        {alignment === 'delivery' && (
          <div>

            <h3>Delivery Details</h3>
            <div>
              <label>
                Address:
                <input
                  type='text'
                  name='address'
                  value={deliveryDetails.address}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div>
              <label>
                City:
                <input
                  type='text'
                  name='city'
                  value={deliveryDetails.city}
                  onChange={handleInputChange}
                />
              </label>
            </div>

          </div>

        )}

        <div className='cart-center'>
          <button className='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300
        font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700
        dark:focus:ring-green-800'
            onClick={handlePayment}
          >
            Pay
          </button>
        </div>
        <div className='cart-center'>
          <button onClick={() => navigate('/')}>Continue Shopping</button>
        </div>

      </div>
     ) : (
        <div>Add redirect logic.</div>
    )}

    </div>
  );
};

export default Checkout;
