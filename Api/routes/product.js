var express = require("express");
var router = express.Router();
const {
  creatProduct,
  deleteProduct,
  getProduct,
  getProducts,
} = require("../controllers/productController");
const { verifyToken } = require("../middlewares/jwt");

router.post("/", verifyToken, creatProduct);
router.delete("/:id", verifyToken, deleteProduct);
router.get("/single/:id", getProduct);
router.get("/", getProducts);

module.exports = router;
