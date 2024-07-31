// path = localhost:8080/login

const express = require('express');
const router = express.Router();
// const cors = require('cors')
const { getUser } = require('../db/queries/users');

// // middleware
// router.use(
//   cors({
//     credentials: true,
//     origin: 'http//localhost:3000'
//   })
// )

router.get("/:id", (req, res) => {
  const user_id = req.params.id;
  // set the cookie
  res.cookie("secrets secrets", user_id)
  // get user information
  getUser(user_id)
  // user info in json format
  .then(user => res.json(user))
  .catch(err => err.message)
})

module.exports = router;