const express=require("express");
const {confirmOrder}=require("../contollers/order.js");
const router=express.Router();
router.post("/confirm",confirmOrder);
module.exports= router;
