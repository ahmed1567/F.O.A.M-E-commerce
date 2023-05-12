var express = require("express");
var router = express.Router();
const userController = require("../controllers/productController");


router.get("/post", userController.post);


module.exports = router;