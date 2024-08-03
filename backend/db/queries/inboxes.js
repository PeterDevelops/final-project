const db = require("../connection")

const getAllChats = (userId) => {
  const queryString = `
    SELECT inboxes.id AS inbox_id, inboxes.user_id AS inbox_user_id, chats.id AS chat_id, chats.user_id AS chat_user_id, chats.contact_user_id AS contact_id, chats.last_message, users.name AS contact_name, users.profile_photo_url AS contact_photo 
      FROM inboxes 
      JOIN inbox_chats ON inboxes.id = inbox_id 
      JOIN chats ON chat_id = chats.id 
      JOIN users ON chats.contact_user_id = users.id 
      WHERE inboxes.user_id = $1;`
  const queryParams = [userId];

  return db.query(queryString, queryParams)
  .then(results => results.rows)
  .catch((err) => {console.log(err.message)})
}

module.exports = {getAllChats};


//get all messages
//SELECT * FROM inboxes JOIN inbox_chats ON inboxes.id = inbox_id JOIN chats ON chat_id = chats.id JOIN chat_messages ON chat_messages.chat_id = inbox_chats.chat_id JOIN messages ON messages.id = message_id WHERE inboxes.user_id = $1;

// get all chats (contact_id is pulling the user, and user id is pulling the contact ==> pull chats for where user_id = contact or user)
//SELECT inboxes.id AS inbox_id, inboxes.user_id AS inbox_user_id, chats.id AS chat_id, chats.user_id AS chat_user_id, chats.contact_user_id AS contact_id, chats.last_message, users.name AS contact_name, users.profile_photo_url AS contact_photo FROM inboxes JOIN inbox_chats ON inboxes.id = inbox_id JOIN chats ON chat_id = chats.id JOIN users ON chats.contact_user_id = users.id WHERE inboxes.user_id = 4;