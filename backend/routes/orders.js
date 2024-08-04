// path = localhost:8080/api/orders

const express = require('express');
const { getOrdersByUserId } = require('../db/queries/orders');
const router = express.Router();

router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  getOrdersByUserId(userId)
    .then(results => {
      res.json(results);
    })
    .catch((err) => {
      console.log(err.message);
    });

});

module.exports = router;
