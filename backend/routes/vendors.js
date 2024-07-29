// path = localhost:8080/api/products

const express = require('express');
const { getAllVendors } = require('../db/queries/vendors');
const router = express.Router();

router.get("/", (req, res) => {
  getAllVendors()
  .then(results => {
    res.json(results)
  })
  .catch((err) => {
    console.log(err.message)
  })

})

module.exports = router;