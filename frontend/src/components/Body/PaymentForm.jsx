import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ userId, totalCost, orderData, orderItems, setCartItems, subtotal, pickupAddresses }) => {

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  const cardStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
        '::placeholder': {
          color: '#a0aec0',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
    hidePostalCode: true,
  };



  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // create a PaymentIntent on the server
      const response = await axios.post('api/stripe/create-payment-intent', {
        amount: Math.round(subtotal * 100),
        userId: userId
      });

      const { clientSecret } = response.data;

      const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: userId
          },
        },
      });

      if (confirmError) {
        setError(confirmError.message);
        return;
      }

      // payment successful, create the order
      const orderResponse = await axios.post('api/orders', { orderData, orderItems });

      // delete the cart and cart items
      // await axios.delete(`/api/cart/${userId}`);
      const { orderId: newOrderId } = orderResponse.data;
      // clear cartItems state
      setCartItems([]);

      // redirect to order confirmation page
      navigate('/order-confirmation', { state: { orderId: newOrderId, pickupAddresses } });
    }
    catch (error) {
      setError('Payment failed');
      console.error('Error:', error);
    }

  }


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white p-4 rounded-md shadow-md">
        <CardElement options={cardStyle} className="p-2 border border-gray-300 rounded-md" />
      </div>

      <div className="flex flex-row justify-between">
        <div className='flex justify-center mb-4'>
          <button
            className='text-sm font-light underline py-2.5'
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </button>
        </div>


        <div className='flex justify-center mb-4'>
          <button
            className="text-sm px-4 py-2 bg-green-600 text-black rounded hover:bg-green-600"
            type="submit"
            disabled={!stripe}
          >
            Pay
          </button>
        </div>

      </div>

      {error && <div className="text-red-500 text-center">{error}</div>}
    </form>
  );
};


export default PaymentForm;
