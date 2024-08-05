const db = require("../connection");

// get orders by user id
const getCartByUserId = (user_id) => {
  const queryString = `
  SELECT
  cart_items.id AS cart_item_id,
  products.id AS product_id,
  products.name AS product_name,
  products.photo_url AS product_photo_url,
  cart_items.quantity,
  products.price_cents,
  vendors.name AS vendor_name,
  vendors.address AS vendor_address,
  vendors.city AS vendor_city,
  vendors.vendor_logo_url
  FROM cart_items
  JOIN products ON cart_items.product_id = products.id
  JOIN carts ON cart_items.cart_id = carts.id
  JOIN vendors ON products.vendor_id = vendors.id
  WHERE carts.user_id = $1;
  `

  const queryParam = [user_id];

  return db.query(queryString, queryParam)
    .then(results => (results.rows))
    .catch((err) => {
      return err.message;
    });
};

// delete cart by user id
const deleteCartByUserId = (user_id) => {
  const queryString = `
  DELETE FROM carts
  WHERE user_id = $1;
  `

  const queryParam = [user_id];

  return db.query(queryString, queryParam)
  .then(() => {
    return true;
  })
  .catch((err) =>
    console.error('Error deleting cart', err)
  )

}

module.exports = { getCartByUserId, deleteCartByUserId };
