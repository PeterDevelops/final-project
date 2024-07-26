// path = localhost:8080/api/products

const express = require('express');
const { getAllProducts } = require('../db/queries/products');
const router = express.Router();

router.get("/", (req, res) => {
  getAllProducts()
  .then(results => console.log(results))

})

module.exports = router;