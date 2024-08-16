// path localhost:3000/api/chats

const express = require('express');
const { getAllChats, findAChat, addChat } = require('../db/queries/chats');
const router = express.Router();

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  getAllChats(userId)
  .then((userChatData) => res.json(userChatData))
  .catch((err) => {err.message})
})

router.get('/', (req, res) => {
  console.log("-----------REQ Query------", req.query)
  const { userId, vendorId } = req.query;
  Promise.all([findAChat(userId, vendorId)])
  .then((results) => {
    res.json(results)})
  .catch((err) => console.log("Error finding a chat:", err))

})

router.post('/new', (req, res) => {
  const userId = req.body.userId;
  const vendorUserId = req.body.vendorUserId;

  addChat(userId, vendorUserId)
  .then((chatData => res.json(chatData)))
  .catch((error) => console.error("Issue pulling message data:", error))
})

module.exports = router;

