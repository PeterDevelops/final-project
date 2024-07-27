// path = localhost:8080/api/products

const express = require('express');
const { getAllProducts } = require('../db/queries/products');
const router = express.Router();

router.get("/", (req, res) => {
  getAllProducts()
  .then(results => {
    res.json(results)
  })
  .catch((err) => {
    console.log(err.message)
  })

})

module.exports = router;