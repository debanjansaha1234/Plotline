const express=require("express");
const {createAdmin,viewOrders}=require("../contollers/admin.js");

const router =express.Router();
router.post("/create",createAdmin);
router.get("/vieworder",viewOrders);
module.exports=router;