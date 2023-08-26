const Service=require("../models/Services.js");
const addService= async(req,res)=>{
    try {
        const {serviceName,price,description}=req.body;
        if(price==0){
            res.json({error:"Please enter price greater than 0"});
        }
        else{
            const saveSer=new Service({
                serviceName,price,description  
            });
            await saveSer.save();
            res.status(201).json({message:"New Service has been added"});
        }
    } catch (error) {
        res.send(error);
    }
} 

const viewService=async(req,res)=>{
    try{
      const service=await Service.find();
      res.send(service);  
    }catch(error){
        res.send(error);
    }
}

module.exports={addService,viewService}