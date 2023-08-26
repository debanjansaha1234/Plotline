const Admin=require("../models/Admin.js");
const bcrypt=require("bcryptjs");
const Order=require("../models/Order.js");

const createAdmin=async(req,res)=>{
    try {
        const {name,email,password,phone}=req.body;
        
        if(!name||!email||!password||!phone){
            return res.status(422).json({error:"Please Fill all details"})
        }
        else{
            const user=await Admin.findOne({email:email});
            if(user!=null){
                res.json({error:"Email already registered"});
            }
            else{
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);
                const saveUser=new Admin({
                    name:name,email:email,password:hash,phone:phone
                });
                await saveUser.save();
                res.status(201).json({message:"Account has been created"});
            }
        }
    } catch (error) {
        res.send(error);
    }
}

const viewOrders=async(req,res)=>{
    try {
        const {email}=req.query;
        const findAdmin=await Admin.findOne({email:email});
        if(!findAdmin){
            res.status(401).json({message:"This API can be accessed by admins only"});
        }
        else{

            const findOrders=await Order.find();
            res.send({Orders:findOrders});
        }
        
    } catch (error) {
        res.send(error);
    }
}

module.exports={
    createAdmin,viewOrders
}