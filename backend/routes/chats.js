// path localhost:3000/api/chats

const express = require('express');
const { getAllChats, findAChat, addChat } = require('../db/queries/chats');
const router = express.Router();

router.get('/:id', (req, res) => {
  // console.log("req.params", req.params)
  const userId = req.params.id;
  // console.log("backend chats route user id", userId)

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
  console.log('userId', userId)
  const vendorUserId = req.body.vendorUserId;
  console.log("vendorUserId", vendorUserId)

  addChat(userId, vendorUserId)
  .then((chatData => res.json(chatData)))
  .catch((error) => console.error("Issue pulling message data:", error))
})

module.exports = router;

// userChatData:
// [
//   {
//     chat_id: 3,
//     last_message: '3',
//     contact_user_id: 1,
//     name: 'Peter',
//     email: 'peter@peter.com',
//     profile_photo_url: 'http://dummyimage.com/174x166.png/5fa2dd/ffffff'
//   },
//   ...
// ]