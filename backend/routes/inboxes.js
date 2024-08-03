// path localhost:3000/inboxes

const express = require('express');
const { getAllChats } = require('../db/queries/inboxes');
const router = express.Router();

router.get('/:id', (req, res) => {
  console.log("req.params", req.params)
  const userId = req.params.id;
  console.log("backend inbox route user id", userId)

  getAllChats(userId)
  .then((userChatData) => res.json(userChatData))
  .catch((err) => {err.message})
})

module.exports = router;