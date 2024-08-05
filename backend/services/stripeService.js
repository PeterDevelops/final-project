const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'cad'
    });
    return paymentIntent;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { createPaymentIntent }
