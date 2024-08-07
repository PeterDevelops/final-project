const express = require('express');
const { postOrders, getOrderByUserId } = require('../db/queries/orders');
const { postOrderItems } = require('../db/queries/order_items');
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
      console.log('itemsWithOrderId:', itemsWithOrderId)
      return postOrderItems(itemsWithOrderId);
    })
    .then(orderItemsResult => {
      res.status(201).json({ orderItems: orderItemsResult });
    })
    .catch((err) => {
      console.error('Error creating order:', err);
    });
});

// get orders by user id
router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  getOrderByUserId(userId)
    .then(results => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err.message);
    });
});


module.exports = router;
