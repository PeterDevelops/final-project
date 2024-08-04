// path localhost:3000/api/messages

const express = require('express');
const { getAllMessages } = require('../db/queries/messages');
const router = express.Router();

router.get('/:id', (req, res) => {
  // console.log("req.params", req.params)
  const chatId = req.params.id;
  // console.log("backend messages route user id", userId)

  getAllMessages(chatId)
  .then((messagesData) => res.json(messagesData))
  .catch((err) => {err.message})
})

module.exports = router;

