const db = require("../connection");

const postOrderItems = (orderItems) => {
  const query = orderItems.map(item => {
    const { order_id, product_id, quantity } = item;
    
    const queryParams = [order_id, product_id, quantity];

    const queryString = `
    INSERT INTO order_items (order_id, product_id, quantity)
    VALUES ($1, $2, $3)
    RETURNING *
    `
    return db.query(queryString, queryParams);
  })

  return Promise.all(query)
  .then(results => results.map(result => result.rows[0]))
  .catch(err => {
    console.error('Error inserting order items:', err);
  })
}

module.exports = { postOrderItems };
