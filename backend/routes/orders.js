// path = localhost:8080/api/orders

const express = require('express');
const { postOrders } = require('../db/queries/orders');
const { postOrderItems } = require('../db/queries/orderItems');
const router = express.Router();

router.post("/", (req, res) => {
  const { orderData, orderItems } = req.body;

  postOrders(orderData)
    .then(order => {
      const orderId = order.id;
      const itemsWithOrderId = orderItems.map(item => ({
        ...item,
        order_id: orderId
      }));
      return postOrderItems(itemsWithOrderId);
    })
    .then(orderItemsResult => {
      res.status(201).json({ orderItems: orderItemsResult });
    })
    .catch((err) => {
      console.error('Error creating order:', err);
    });

});

module.exports = router;
