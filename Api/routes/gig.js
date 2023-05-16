var express = require("express");
var router = express.Router();
const {
  creatGig,
  deleteGig,
  getGig,
  getGigs,
} = require("../controllers/gigController");
const { verifyToken } = require("../middlewares/jwt");

router.post("/", verifyToken, creatGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/", getGigs);
router.get("/single/:id", getGig);

module.exports = router;
