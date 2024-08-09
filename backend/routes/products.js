// path = localhost:8080/api/products

const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require('../db/queries/products');
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

router.put("/", (req, res) => {
  const { name, description, photo_url, inventory, price_cents, vendor_id, category, sub_category, id } = req.body;
  updateProduct({ name, description, photo_url, inventory, price_cents, vendor_id, category, sub_category, id })
    .then(updatedProduct => {
      res.json(updatedProduct);
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).json({ error: "Failed to update product" });
    });
});

router.delete("/", (req, res) => {
  const { id } = req.body;
  deleteProduct(id)
    .then(() => {
      res.status(200).json({ message: "Product deleted successfully" });
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).json({error: "Failed to delete Product"});
    })
});


module.exports = router;
