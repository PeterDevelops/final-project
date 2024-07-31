const db = require("../connection")

//get all products
const getAllProducts = () => {
  const queryString = `SELECT * FROM products;`;

  return db.query(queryString)
    .then(results => (results.rows))
    .catch((err) => {
      return err.message;
    })
}

//get all DISTINCT categories
const getAllCategories = () => {
  const queryString = `SELECT DISTINCT category FROM products;`;

  return db.query(queryString)
    .then(results => (results.rows))
    .catch((err) => {
      return err.message;
    })
}

module.exports = { getAllProducts, getAllCategories }


