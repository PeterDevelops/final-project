// path = localhost:8080/api/products

const express = require('express');
const { getAllVendors, createVendor, updateVendor } = require('../db/queries/vendors');
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

router.post("/", (req, res) => {
  const { name, bio, address, city, longitude, latitude, vendor_logo_url, admin_user } = req.body;
  createVendor({ name, bio, address, city, longitude, latitude, vendor_logo_url, admin_user })
    .then(newVendor => {
      res.status(201).json(newVendor);
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).json({ error: "Failed to create vendor" });
    });
});

module.exports = router;
