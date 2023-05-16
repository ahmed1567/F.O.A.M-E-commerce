var express = require("express");
var router = express.Router();
const {getConversations,createConversation,getSingleConversation,updateConversation} = require("../controllers/conversationController");
const { verifyToken } = require("../middlewares/jwt");


router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, createConversation);
router.get("/single/:id", verifyToken, getSingleConversation);
router.put("/:id", verifyToken, updateConversation);


module.exports = router;