// path = localhost:8080/logout

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.clearCookie("Secrets")
  res.status(200).send('Logged out successfully');
})

module.exports = router;