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
  const queryString =
    `SELECT DISTINCT ON (city) city,
    vendors.longitude,
    vendors.latitude,
    vendors.name,
    vendors.address
    FROM vendors;`;

  return db.query(queryString)
    .then(results => {
      return results.rows.map((row, index) => ({
        id: `${row.longitude},${row.latitude}`,
        ...row,
        name: row.name,
        address: row.address,

      }));
    })
    .catch((err) => {
      return err.message;
    });
};


module.exports = { getAllVendors, getAllLocations }


