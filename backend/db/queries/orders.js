const db = require("../connection");

const postOrders = (orderData) => {

  const { user_id, total_cost, delivery_type, delivery_address, delivery_city } = orderData;

  const orderQueryParams = [user_id, total_cost, delivery_type, delivery_address, delivery_city];

  const orderQueryString = `
  INSERT INTO orders (user_id, total_cost, delivery_type, delivery_address, delivery_city)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
  `;

  return db.query(orderQueryString, orderQueryParams)
    .then(result => (
      result.rows[0]
    ))
    .catch((err) => {
      console.error(err);
});
}
module.exports = { postOrders }
