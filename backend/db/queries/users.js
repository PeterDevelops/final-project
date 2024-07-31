const db = require('../connection')

const getUser = (id) => {
  const queryString = `SELECT * FROM users WHERE users.id = $1;`;
  const queryParams = [id];

  return db.query(queryString, queryParams)
  .then(results => results.rows)
  .catch(err => err.message)
};

module.exports = { getUser }