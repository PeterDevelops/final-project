const db = require("../connection")

const getAllChats = (userId) => {
  const queryString = `
    SELECT chat_id, last_message, contact_user_id, users.name AS contact_name, users.email AS contact_email, users.profile_photo_url AS contact_photo
      FROM (
        SELECT chats.id AS chat_id, last_message, 
        CASE 
        WHEN chats.contact_user_id = $1 THEN chats.user_id
        WHEN chats.contact_user_id <> $1 THEN chats.contact_user_id
        END AS contact_user_id
        FROM chats
        WHERE chats.user_id = $1
        OR chats.contact_user_id = $1
        ) AS relevant_chats
      JOIN users ON users.id = contact_user_id;`
  const queryParams = [userId];

  return db.query(queryString, queryParams)
    .then(results => results.rows)
    .catch((err) => { console.log(err.message) })
}

module.exports = { getAllChats };

//get all chats with contact_user's details
// SELECT chat_id, last_message, contact_user_id, users.name, users.email, users.profile_photo_url
// FROM(
//   SELECT chats.id AS chat_id, last_message,
//   CASE 
//   WHEN chats.contact_user_id = $1 THEN chats.user_id
//   WHEN chats.contact_user_id <> $1 THEN chats.contact_user_id
//   END AS contact_user_id
// FROM chats
// WHERE chats.user_id = $1
// OR chats.contact_user_id = $1
// ) AS relevant_chats
// JOIN users ON users.id = contact_user_id;





