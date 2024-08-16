import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * PaymentForm component handles the payment process using Stripe.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.userId - ID of the user making the payment.
 * @param {Object} props.orderData - Data related to the order being placed.
 * @param {Array} props.orderItems - List of items included in the order.
 * @param {Function} props.setCartItems - Function to update the cart items after a successful payment.
 * @param {number} props.subtotal - The subtotal amount of the order.
 * @param {Array} props.pickupAddresses - List of pickup addresses (if applicable).
 * @param {string} props.alignment - Delivery or pickup alignment option.
 * @param {Object} props.deliveryDetails - Details related to delivery (if applicable).
 *
 * @returns {JSX.Element} The rendered PaymentForm component.
 */
const PaymentForm = (props) => {
  const {
    userId,
    orderData,
    orderItems,
    setCartItems,
    subtotal,
    pickupAddresses,
    alignment,
    deliveryDetails
  } = props;

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Styling for the CardElement
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

  /**
   * Handles form submission, processes payment, and updates the order status.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Create a PaymentIntent on the server
      const response = await axios.post('api/stripe/create-payment-intent', {
        amount: Math.round(subtotal * 100), // Convert to the smallest currency unit
        userId: userId
      });

      const { clientSecret } = response.data;

      // Confirm the payment with Stripe
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

      // Create the order in the backend
      const orderResponse = await axios.post('api/orders', { orderData, orderItems });
      const { orderId: newOrderId } = orderResponse.data;

      // Clear cart and navigate to order confirmation page
      setCartItems([]);
      navigate('/order-confirmation', {
        state: {
          orderId: newOrderId,
          pickupAddresses,
          alignment,
          deliveryDetails,
        }
      });
    } catch (error) {
      setError('Payment failed');
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='bg-white p-4 rounded-md shadow-md'>
        <CardElement options={cardStyle} className='p-2 border border-gray-300 rounded-md' />
      </div>

      <div className='flex flex-row justify-between'>
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
            className='text-sm px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
            type='submit'
            disabled={!stripe}
          >
            Pay
          </button>
        </div>
      </div>

      {error && <div className='text-red-500 text-center'>{error}</div>}
    </form>
  );
};

export default PaymentForm;
