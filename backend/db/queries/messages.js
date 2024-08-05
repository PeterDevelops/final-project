const db = require("../connection")

const getAllMessages = (chatId) => {
  const queryString = `
    SELECT * FROM messages WHERE chat_id = $1;`
  const queryParams = [chatId];

  return db.query(queryString, queryParams)
    .then(results => results.rows)
    .catch((err) => { console.log(err.message) })
}

module.exports = { getAllMessages };