// path = localhost:8080/login

const express = require('express');
const router = express.Router();
const { getUser } = require('../db/queries/users');

router.post("/", (req, res) => {
  const userEmail = req.body.email
  getUser(userEmail)
  .then((userData) => {
    // console.log("user----", userData);
    res.cookie("Secrets", userData[0].id);
    res.json(userData);
  })
  .catch((err) => err.message)

})

module.exports = router;