const db = require("../connection");

//get all products
const getAllOrders = () => {
  const queryString = `SELECT * FROM orders;`;

  return db.query(queryString)
    .then(results => (results.rows))
    .catch((err) => {
      return err.message;
    });
};

module.exports = { getAllOrders }


