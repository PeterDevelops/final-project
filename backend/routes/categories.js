const express = require('express');
const { getAllCategories } = require('../db/queries/products');
const router = express.Router();

router.get("/", (req, res) => {
  getAllCategories()
    .then(results => {
      res.json(results)
    })
    .catch((err) => {
      console.log(err.message)
    })

})

module.exports = router;
