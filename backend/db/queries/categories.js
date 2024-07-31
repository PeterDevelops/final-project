const db = require("../connection")

//get all DISTINCT categories (distinct values only, no repeats)
const getAllCategories = () => {
  const queryString = `SELECT DISTINCT category FROM products;`;

  return db.query(queryString)
    .then(results => (results.rows))
    .catch((err) => {
      return err.message;
    })
}

module.exports = { getAllCategories }


