const express=require("express");
const {addService,viewService}=require("../contollers/service.js");
const router=express.Router();
router.post("/addservice",addService);
router.get("/viewservice",viewService);
module.exports=router;