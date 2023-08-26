const express=require("express");
const {createUser,viewAll,addProductToCart,removeProductFromCart,clearCart,totalBill}=require("../contollers/user.js");
const router =express.Router();
router.post("/register",createUser);
router.get("/view",viewAll);
router.post("/addtocart",addProductToCart);
router.post("/removecart",removeProductFromCart);
router.post("/clearcart",clearCart);
router.post("/bill",totalBill);

module.exports=router;