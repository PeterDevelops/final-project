const db = require("../connection")

//get all products
const getAllVendors = () => {
  const queryString = `SELECT * FROM vendors;`;

  return db.query(queryString)
  .then(results => results.rows)
  .catch((err) => {
    return err.message;
  })
}

// get all locations
const getAllLocations = () => {
  const queryString = 'SELECT DISTINCT ON (city) city, vendors.longitude, vendors.latitude FROM vendors;'

  return db.query(queryString)
  .then(results => results.rows)
  .catch((err) => {
    return err.message;
  })

};


module.exports = { getAllVendors, getAllLocations }


