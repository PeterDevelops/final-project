const db = require("../connection");

const getOrdersByUserId = (user_id) => {
  const cartItemsQuery = `
  SELECT
  cart_items.id AS cart_item_id,
  products.id AS product_id,
  products.name AS product_name,
  products.photo_url AS product_photo_url,
  cart_items.quantity,
  products.price_cents,
  vendors.name AS vendor_name,
  vendors.vendor_logo_url
  FROM cart_items
  JOIN products ON cart_items.product_id = products.id
  JOIN carts ON cart_items.cart_id = carts.id
  JOIN vendors ON products.vendor_id = vendors.id
  WHERE carts.user_id = $1;
  `

  const queryParam = [user_id];

  return db.query(cartItemsQuery, queryParam)
    .then(results => (results.rows))
    .catch((err) => {
      return err.message;
    });
};

module.exports = { getOrdersByUserId }

;;
