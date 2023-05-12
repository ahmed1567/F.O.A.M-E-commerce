var express = require("express");
var router = express.Router();
const {deleteUser} = require("../controllers/userController");
const {verifyToken}= require("../middlewares/jwt")


router.delete("/:id",verifyToken ,deleteUser);


module.exports = router;
