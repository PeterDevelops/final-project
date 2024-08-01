const db = require('../connection')

const getUser = (email) => {
  const queryString = `SELECT * FROM users WHERE users.email = $1;`;
  const queryParams = [email];

  return db.query(queryString, queryParams)
  .then(results => results.rows)
  .catch(err => err.message)
};

module.exports = { getUser }