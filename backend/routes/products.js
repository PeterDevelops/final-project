// path = localhost:8080/api/products

const express = require('express');
const { getAllProducts, createProduct } = require('../db/queries/products');
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

router.post("/", (req, res) => {
  const { name, description, photo_url, inventory, price_cents, vendor_id, category, sub_category } = req.body;
  createProduct({ name, description, photo_url, inventory, price_cents, vendor_id, category, sub_category })
    .then(newProduct => {
      res.status(201).json(newProduct);
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).json({ error: "Failed to create product" });
    });
});

module.exports = router;
