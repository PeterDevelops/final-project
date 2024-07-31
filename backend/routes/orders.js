// path = localhost:8080/api/orders

const express = require('express');
const { getAllOrders } = require('../db/queries/orders');
const router = express.Router();

router.get("/", (req, res) => {
  getAllOrders()
    .then(results => {
      res.json(results);
    })
    .catch((err) => {
      console.log(err.message);
    });

});

module.exports = router;
