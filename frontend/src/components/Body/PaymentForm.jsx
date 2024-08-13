import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/PaymentForm.scss';


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
      <div className="flex justify-center">
        <button
          className="bg-green-700 text-white font-medium rounded-full px-5 py-2 text-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-50"
          type="submit"
          disabled={!stripe}
        >
          Pay
        </button>
      </div>
      {error && <div className="text-red-500 text-center">{error}</div>}
    </form>
  );
};


export default PaymentForm;
