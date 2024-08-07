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

const createVendor = ({ name, bio, address, city, longitude, latitude, vendor_logo_url, admin_user }) => {
  const query = `
    INSERT INTO vendors (name, bio, address, city, longitude, latitude, vendor_logo_url, admin_user)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
  const values = [name, bio, address, city, longitude, latitude, vendor_logo_url, admin_user];

  return db.query(query, values)
    .then(result => result.rows[0])
    .catch(err => console.error(err.message));
};

// get all locations
const getAllLocations = () => {
  const queryString =
    `SELECT DISTINCT ON (city)
      vendors.id AS vendor_id,
      vendors.city,
      vendors.longitude,
      vendors.latitude,
      vendors.name,
      vendors.address
    FROM vendors;
  `;

  return db.query(queryString)
    .then(results => {
      return results.rows.map((row, index) => ({
        id: `${row.longitude},${row.latitude}`,
        vendor_id: row.vendor_id,
        ...row,
      }));
    })
    .catch((err) => {
      return err.message;
    });
};


module.exports = { getAllVendors, getAllLocations, createVendor }


