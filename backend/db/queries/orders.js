const db = require("../connection");

//get all products
const getOrdersByUserId = (user_id) => {
  const cartItemsQuery = `
  SELECT
  order_items.id AS order_item_id,
  products.id AS product_id,
  products.name AS product_name,
  products.photo_url AS product_photo_url,
  order_items.quantity,
  products.price_cents,
  orders.total_cost,
  vendors.name AS vendor_name,
  vendors.vendor_logo_url
  FROM order_items
  JOIN products ON order_items.product_id = products.id
  JOIN orders ON order_items.order_id = orders.id
  JOIN vendors ON products.vendor_id = vendors.id
  WHERE orders.user_id = $1;
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
