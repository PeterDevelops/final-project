// path localhost:3000/api/chats

const express = require('express');
const { getAllChats } = require('../db/queries/chats');
const router = express.Router();

router.get('/:id', (req, res) => {
  // console.log("req.params", req.params)
  const userId = req.params.id;
  // console.log("backend chats route user id", userId)

  getAllChats(userId)
  .then((userChatData) => res.json(userChatData))
  .catch((err) => {err.message})
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