var express = require('express');
var router = express.Router();
const Product = require('../model/add')
// const os = require("os");

/* GET users listing. */
router.get('/product', async function(req, res, next) {
  try {
    const products = await Product.find(_id)
    .populate('_id', 'name title img price')
    .sort({createdAt: -1});
    res.json(products)
  } catch (err) {
    console.log(err);
  }
});

// const userInfo = os.userInfo();
// const uid = userInfo;
// console.log(uid); // 20

module.exports = router;
