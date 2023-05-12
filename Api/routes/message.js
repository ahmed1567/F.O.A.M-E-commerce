var express = require("express");
var router = express.Router();
const userController = require("../controllers/messageController");


router.get("/post", userController.post);


module.exports = router;