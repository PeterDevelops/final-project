// path localhost:3000/api/messages

const express = require('express');
const { getAllMessages, addMessage, getLastMessage } = require('../db/queries/messages');
const router = express.Router();

router.get('/:id', (req, res) => {
  const chatId = req.params.id;

  getAllMessages(chatId)
  .then((messagesData) => res.json(messagesData))
  .catch((err) => {err.message})
})

router.post('/:id', (req, res) => {
  const message = req.body.message;
  const date = req.body.created_at;
  const senderId = req.body.sender_id;
  const chatId = req.params.id;


  addMessage(message, date, senderId, chatId)
  .then((messageData => res.json(messageData)))
  .catch((error) => console.error("Issue pulling message data:", error))
})

router.get('/last/:id', (req, res) => {
  const chatId = req.params.id;
  getLastMessage(chatId)
  .then((messagesData) => res.json(messagesData))
  .catch((err) => {err.message})
})

module.exports = router;

