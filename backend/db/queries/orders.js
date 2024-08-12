const db = require("../connection");

// insert orders
const postOrders = (orderData) => {

  const { user_id, total_cost, delivery_type, delivery_address, delivery_city } = orderData;

  const queryParams = [user_id, total_cost, delivery_type, delivery_address, delivery_city];

  const queryString = `
  INSERT INTO orders (user_id, total_cost, delivery_type, delivery_address, delivery_city)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
  `;

  return db.query(queryString, queryParams)
    .then(result => (
      result.rows[0]
    ))
    .catch((err) => {
      console.error(err);
});
}

// get orders by user id
const getOrderByUserId = (user_id) => {
  const queryString = `
  SELECT
  order_items.order_id AS order_id,
  products.id AS product_id,
  products.name AS product_name,
  products.photo_url AS product_photo_url,
  order_items.quantity,
  products.price_cents,
  vendors.name AS vendor_name,
  vendors.address AS vendor_address,
  vendors.city AS vendor_city,
  vendors.vendor_logo_url
  FROM order_items
  JOIN products ON order_items.product_id = products.id
  JOIN orders ON order_items.order_id = orders.id
  JOIN vendors ON products.vendor_id = vendors.id
  WHERE orders.user_id = $1;
  `

  const queryParam = [user_id];

  return db.query(queryString, queryParam)
    .then(results => (results.rows))
    .catch((err) => {
      return err.message;
    });
};

module.exports = { postOrders, getOrderByUserId }
