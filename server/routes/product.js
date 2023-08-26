const express=require("express");
const {addProduct,viewProduct}=require("../contollers/product.js");
const router=express.Router();
router.post("/addproduct",addProduct);
router.get("/viewproduct",viewProduct);
module.exports=router;