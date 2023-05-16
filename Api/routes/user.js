var express = require("express");
var router = express.Router();
const { deleteUser, getUser } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/jwt");

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);

module.exports = router;
