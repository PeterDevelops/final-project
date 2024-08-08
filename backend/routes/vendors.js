// path = localhost:8080/api/products

const express = require('express');
const { getAllVendors, createVendor, updateVendor, deleteVendor } = require('../db/queries/vendors');
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

router.put("/", (req, res) => {
  const { id, name, bio, address, city, longitude, latitude, vendor_logo_url, admin_user } = req.body;
  updateVendor({ id, name, bio, address, city, longitude, latitude, vendor_logo_url, admin_user })
    .then(updatedVendor => {
      res.json(updatedVendor);
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).json({ error: "Failed to update vendor" });
    });
});

router.delete("/", (req, res) => {
  const { id } = req.body;
  deleteVendor(id)
    .then(() => {
      res.status(200).json({ message: "Vendor deleted successfully" });
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).json({error: "Failed to delete vendor"});
    })
});

module.exports = router;
