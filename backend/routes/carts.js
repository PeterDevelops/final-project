const express = require('express');
const router = express.Router();
const { getCartByUserId } = require('../db/queries/carts');
const { deleteCartItemsByUserId } = require('../db/queries/cart_items');
const { deleteCartByUserId } = require('../db/queries/carts');

// get orders by user id
router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  getCartByUserId(userId)
    .then(results => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err.message);
    });

});

// delete cart by user id
router.delete('/:userId', (req, res) => {
  const { userId } = req.params;

  Promise.all([deleteCartItemsByUserId(userId), deleteCartByUserId(userId)])
  .then(() => {
    res.status(204).send();
  })
  .catch(err => {
    res.status(500).send('Error deleting cart items');
  })
})

module.exports = router;
