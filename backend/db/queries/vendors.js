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

const updateVendor = ({ id, name, bio, address, city, longitude, latitude, vendor_logo_url, admin_user }) => {
  const query = `
    UPDATE vendors
    SET name = $1,
        bio = $2,
        address = $3,
        city = $4,
        longitude = $5,
        latitude = $6,
        vendor_logo_url = $7,
        admin_user = $8
    WHERE id = $9
    RETURNING *;
  `;
  const values = [name, bio, address, city, longitude, latitude, vendor_logo_url, admin_user, id];

  return db.query(query, values)
    .then(result => result.rows[0])
    .catch(err => console.error(err.message));
};

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


module.exports = { getAllVendors, getAllLocations, createVendor, updateVendor }


