const db = require("../connection")

//get all products
const getAllVendors = () => {
  const queryString = `SELECT * FROM vendors;`;

  return db.query(queryString)
  .then(results => (results.rows))
  .catch((err) => {
    return err.message;
  })
}

module.exports = { getAllVendors }


