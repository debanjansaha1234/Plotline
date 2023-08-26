const Product=require("../models/Product.js");
const addProduct= async(req,res)=>{
    try {
        const {productName,price,quantity,description}=req.body;
        if(price==0){
            res.json({error:"Please enter price greater than 0"});
        }
        else{
            const saveProd=new Product({
                productName,price,quantity,description  
            });
            await saveProd.save();
            res.status(201).json({message:"New product has been added"});
        }
    } catch (error) {
        req.send(error);
    }
} 

const viewProduct=async(req,res)=>{
    try{
      const product=await Product.find();
      res.send(product);  
    }catch(error){
        res.send(error);
    }
}

module.exports={addProduct,viewProduct};