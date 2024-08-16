const db = require("../connection")

const getAllMessages = (chatId) => {
  const queryString = `
    SELECT * FROM messages WHERE chat_id = $1;`
  const queryParams = [chatId];

  return db.query(queryString, queryParams)
    .then(results => results.rows)
    .catch((err) => {
      console.error(err);
      throw new Error('Could not get all messages')})
}

const addMessage = (message, created_at, senderId, chatId) => {
  const queryString = `
    INSERT INTO messages (message, created_at, sender_id, chat_id)
    VALUES ($1, $2, $3, $4) RETURNING *;`;
  const queryParams = [message, created_at, senderId, chatId];

  return db.query(queryString, queryParams)
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.error(err);
    throw new Error('Could not add message')
  });
}

const getLastMessage = (chatId) => {
  const queryString = `
    SELECT messages.*, users.name FROM messages JOIN users ON messages.sender_id = users.id WHERE chat_id = $1 ORDER BY messages.id DESC LIMIT 1;`
  const queryParams = [chatId];

  return db.query(queryString, queryParams)
    .then(results => results.rows)
    .catch((err) => {
      console.error(err);
      throw new Error('Could not get all messages')})
}

module.exports = { getAllMessages, addMessage, getLastMessage };

