var express = require("express");
var router = express.Router();
const {getOrders,intent,confirm} = require("../controllers/orderController");
const { verifyToken } = require("../middlewares/jwt");

router.get("/", verifyToken, getOrders);
// router.post("/create-payment-intent/:id", verifyToken, intent);
// router.put("/", verifyToken, confirm);


module.exports = router;