var express = require("express");
var router = express.Router();
const {createReview,getReviews,deleteReview} = require("../controllers/reviewController");
const { verifyToken } = require("../middlewares/jwt");


router.post("/", verifyToken, createReview )
router.get("/:productId", getReviews )
router.delete("/:id",verifyToken, deleteReview)


module.exports = router;