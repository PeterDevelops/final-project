const express = require('express');
const { postOrders, getOrderByUserId, getOrderByOrderId } = require('../db/queries/orders');
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
      // console.log('itemsWithOrderId:', itemsWithOrderId)
      return postOrderItems(itemsWithOrderId).then(orderItemsResult => {
        res.status(201).json({ orderId: orderId, orderItems: orderItemsResult })
      });
    })
    // .then(orderItemsResult => {
    //   res.status(201).json({ orderId: orderId, orderItems: orderItemsResult });
    // })
    .catch((err) => {
      console.error('Error creating order:', err);
    });
});

// get orders by user id
router.get("/user/:userId", (req, res) => {
  const { userId } = req.params;

  getOrderByUserId(userId)
    .then(results => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err.message);
    });
});

// get orders by order id
router.get("/order/:orderId", (req, res) => {
  const { orderId } = req.params;

  getOrderByOrderId(orderId)
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    console.error(err.message)
  })
})
module.exports = router;
