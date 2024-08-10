const db = require("../connection")

const getAllChats = (userId) => {
  const queryString = `
    SELECT chat_id, contact_user_id, vendors.name AS contact_name, vendors.vendor_logo_url AS contact_photo, vendors.id AS vendor_id
      FROM (
        SELECT chats.id AS chat_id, 
        CASE 
        WHEN chats.contact_user_id = $1 THEN chats.user_id
        WHEN chats.contact_user_id <> $1 THEN chats.contact_user_id
        END AS contact_user_id
        FROM chats
        WHERE chats.user_id = $1
        OR chats.contact_user_id = $1
        ) AS relevant_chats
      JOIN users ON users.id = contact_user_id
      JOIN vendors ON users.id = vendors.admin_user;`
  const queryParams = [userId];

  return db.query(queryString, queryParams)
    .then(results => results.rows)
    .catch((err) => { console.log(err.message) })
}


// const findAChat = (userId, contactId) => {
//   const queryString = `
//     SELECT * FROM (
//       SELECT * FROM chats WHERE user_id = $1 OR contact_user_id = $1) 
//     AS relevant_chats WHERE user_id = $2 OR contact_user_id = $2; 
//   `
//   const queryParams = [userId, contactId]
//   return db.query(queryString, queryParams)
//     .then(results => results.rows)   
//     .catch((err) => { console.log(err.message) })
// }

const findAChat = (userId, vendorId) => {
  console.log("USERID----", userId)
  console.log("VENDORID----", vendorId)

  const chatQueryString = `
  SELECT * FROM (
    SELECT * FROM chats WHERE user_id = $1 OR contact_user_id = $1) 
    AS relevant_chats WHERE user_id = $2 OR contact_user_id = $2; `;

  const vendorQueryString = `
    SELECT vendors.name AS contact_name, vendors.vendor_logo_url AS contact_photo, vendors.id AS vendor_id, vendors.admin_user AS vendor_user_id
    FROM vendors
    WHERE vendors.id = $1;`;

  const chatQueryParams = [userId, vendorId];
  const vendorQueryParams = [vendorId];

  const chatQuery = db.query(chatQueryString, chatQueryParams);
  const vendorQuery = db.query(vendorQueryString, vendorQueryParams);

  const promiseArray = [chatQuery, vendorQuery];
  console.log("promise array", promiseArray)

  return Promise.all(promiseArray)
    .then(results => {
      const chat = results[0].rows;
      console.log("CHAT---", chat)
      const vendor = results[1].rows[0];
      console.log("VENDOR---", vendor)
      const chatObj = { chat, vendor };
      console.log("CHATOBJ----", chatObj)
      return chatObj;
    })
    .catch((err) => {
      console.log("This was the error", err.message);
    }
    )
};

const addChat = (userId, vendorUserId) => {
  const queryString = `
    INSERT INTO chats (user_id, contact_user_id) VALUES ($1, $2) RETURNING *;`;
  const queryParams = [userId, vendorUserId];

  return db.query(queryString, queryParams)
    .then(result => {
      console.log('Added Chat Result: ', result);
      return result.rows[0];
    })
    .catch(err => {
      // console.error(err);
      throw new Error('Could not add chat')
    });
}

module.exports = { getAllChats, findAChat, addChat };

//get all chats with contact_user's details
//SELECT chat_id, contact_user_id, users.name, users.email, users.profile_photo_url FROM(SELECT chats.id AS chat_id, CASE WHEN chats.contact_user_id = 4 THEN chats.user_id WHEN chats.contact_user_id <> 4 THEN chats.contact_user_id END AS contact_user_id FROM chats WHERE chats.user_id = 4 OR chats.contact_user_id = 4) AS relevant_chats JOIN users ON users.id = contact_user_id;


// SELECT * FROM (SELECT * FROM chats WHERE user_id = 4 OR contact_user_id = 4) AS relevant_chats WHERE user_id = 1 OR contact_user_id = 1; 


// SELECT * FROM (SELECT * FROM chats WHERE user_id = 4 OR contact_user_id = 4) AS relevant_chats WHERE user_id = 1 OR contact_user_id = 1; 