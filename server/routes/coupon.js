const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");
// controllers
const {create, remove, list} = require("../controllers/coupon");

// route
router.post("/coupon", authCheck, adminCheck, create); //save cart
router.get("/coupons", list); //save cart
router.delete("/coupon/:couponId", authCheck, adminCheck, remove); //save cart

module.exports = router;