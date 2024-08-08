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

const createProduct = ({ name, description, photo_url, inventory, price_cents, vendor_id, category, sub_category }) => {
  const query = `
    INSERT INTO products (name, description, photo_url, inventory, price_cents, vendor_id, category, sub_category)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
  const values = [name, description, photo_url, inventory, price_cents, vendor_id, category, sub_category];

  return db.query(query, values)
    .then(result => result.rows[0])
    .catch(err => console.error(err.message));
};

//get all DISTINCT categories
const getAllCategories = () => {
  const queryString = `SELECT DISTINCT category FROM products;`;

  return db.query(queryString)
    .then(results => (results.rows))
    .catch((err) => {
      return err.message;
    })
}

module.exports = { getAllProducts, getAllCategories, createProduct }


