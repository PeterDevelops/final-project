// path localhost:3000/api/messages

const express = require('express');
const { getAllMessages, addMessage, getLastMessage } = require('../db/queries/messages');
const router = express.Router();

router.get('/:id', (req, res) => {
  // console.log("req.params", req.params)
  const chatId = req.params.id;
  // console.log("backend messages route user id", userId)

  getAllMessages(chatId)
  .then((messagesData) => res.json(messagesData))
  .catch((err) => {err.message})
})

router.post('/:id', (req, res) => {
  const message = req.body.message;
  console.log('message', message)
  const date = req.body.created_at;
  console.log('date', date)
  const senderId = req.body.sender_id;
  console.log('senderId', senderId)
  const chatId = req.params.id;
  console.log("chatId", chatId)


  addMessage(message, date, senderId, chatId)
  .then((messageData => res.json(messageData)))
  .catch((error) => console.error("Issue pulling message data:", error))
})

router.get('/last/:id', (req, res) => {
  const chatId = req.params.id;
  // console.log("-----------REQ PARAMS------", req.params)
  getLastMessage(chatId)
  .then((messagesData) => res.json(messagesData))
  .catch((err) => {err.message})
})

module.exports = router;

