const express = require('express');
const router = express.Router();
const { createPaymentIntent } = require('../services/stripeService');

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await createPaymentIntent(amount);
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = router;
