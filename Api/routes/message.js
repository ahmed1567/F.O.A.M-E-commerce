var express = require("express");
var router = express.Router();
const {createMessage,getMessages} = require("../controllers/messageController");
const { verifyToken } = require("../middlewares/jwt");


router.post("/", verifyToken, createMessage);
router.get("/:id", verifyToken, getMessages);


module.exports = router;