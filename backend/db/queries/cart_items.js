const db = require("../connection");

// delete cart items by user id
const deleteCartItemsByUserId = (user_id) => {

  const queryString = `
  DELETE FROM cart_items
  WHERE user_id = $1;
  `

  const queryParam = [user_id];

  return db.query(queryString, queryParam)
  .then(() => {
    return true;
  })
  .catch(err => {
    console.error('Error deleting cart items:', err);
  })

}

module.exports = { deleteCartItemsByUserId };
