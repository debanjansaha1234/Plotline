
const createRoute=require("../routes/user.js");
const productRoute=require("../routes/product.js");
const serviceRoute=require("../routes/service.js");
const orderRoute=require("../routes/order.js");
const adminRoute=require("../routes/admin.js");
const express=require("express");
const app=express();
app.use(express.json());
app.use("/api/order",orderRoute);
app.use("/api/user",createRoute);
app.use("/api/prod",productRoute);
app.use("/api/service",serviceRoute);
app.use("/api/admin",adminRoute);
module.exports=app;


