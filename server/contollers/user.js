const User=require("../models/User.js");
const bcrypt=require("bcryptjs"); 
const Services=require("../models/Services.js");
const Product=require("../models/Product.js");
const UserCart=require("../models/UserCart.js");


const createUser=async(req,res)=>{
    try{
        const {name,email,password,phone}=req.body;
        if(!name||!email||!password||!phone){
            return res.status(422).json({error:"Please Fill all details"})
        }
        else{
            const user=await User.findOne({email:email});
            if(user!=null){
                res.json({error:"Email already registered"});
            }
            else{
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);
                const saveUser=new User({
                    name:name,email:email,password:hash,phone:phone
                });
                await saveUser.save();
                res.status(201).json({message:"Account has been created"});
            }
        }
    }catch(error){
        res.send(error);
    }
}

const viewAll=async (req,res)=>{
    try {
      const service=await Services.find();
      const product=await Product.find();
      res.status(200).json({
        Services:service,
        Products:product
      }) 
        
    } catch (error) {
        res.send(error);
    }
}
const addProductToCart=async(req,res)=>{
    try{
        const {email}=req.query;
        const {product,service,quantity}=req.body;
        
        if(product){
            const findProd=await Product.findOne({productName:product});
            
            if(!findProd){
                return res.send({message:"No such Product found"}); 
            }
            else if(findProd.quantity==0) {
                return res.send({message:"Product is out of stock"});
            }
            else if(findProd.quantity<quantity){
                return res.send({message:"Cannot add more quantity than present stocks"});
            }

            const findCart=await UserCart.findOne({
                email:email
            });

            if(findCart){
                const arr=[...findCart.products,{name:product,quantity:quantity}];

                await UserCart.updateOne({email:email},{
                    $set:{
                        products:arr
                    }
                })
                
            }
            else if(!findCart){

                const arr=[{name:product,quantity:quantity}];
               

                const saveCart=new UserCart({email:email,products:arr});
                await saveCart.save();
                
            } 
        }
        if(service){
            const findService=await Services.findOne({serviceName:service});
            if(!findService){
                return res.send({message:"No such Service available"}); 
            }
            const findCart=await UserCart.findOne({
                email:email
            });
            let flag=0;
            if(findCart){
                findCart.services.map((ele)=>{
                    if(ele.name==service){
                        flag=1;
                    }
                });
                if(flag==1){
                    return res.send({message:"Service already added to the cart"});
                }
                const arr=[...findCart.services,{name:service}];
                await UserCart.updateOne({email:email},{
                    $set:{
                        services:arr
                    }
                })
    
            }
            else if(!findCart){

                const arr=[{name:service}];
                const saveCart=new UserCart({email:email,services:arr});
                await saveCart.save();      
            }
        }
        res.json({message:"Added to the cart"});
    }catch(error){
        res.send(error);
    }
} 

const removeProductFromCart=async(req,res)=>{
    try {
        const {email}=req.query;
        
        const {product,service}=req.body;

        const findCart=await UserCart.findOne({email:email});
        if(!findCart||(findCart.products.length==0&&findCart.services.length==0)){
            return res.json({message:"Your Cart is Empty"});
        }
        if(product){
            if(findCart.products.length==0) {
                return res.json({message:"No products is there"});
            }

            let count=0;
            findCart.products.map((ele)=>{
                if(ele.name!=product){count++;}
            });

            if(count==findCart.products.length) {
                return res.send({message:"No such products is in the cart"});
            }
            else{
                let indx;
                findCart.products.map((ele,ind)=>{
                    if(ele.name==product) {
                        indx=ind;
                    }
                });
                findCart.products.splice(indx,1);
                await UserCart.updateOne({email:email},{
                    $set:{
                           products:findCart.products 
                    }
                });
            }
        }
        if(service){
            if(findCart.services.length==0){
                return res.json({message:"No services is there"});
            }
            let count=0;
            findCart.services.map((ele)=>{
                if(ele.name!=service){count++;}
            });
            if(count==findCart.services.length) {
                return res.send({message:"No such services is in the cart"});
            }
            else{
                let indx;
                findCart.services.map((ele,ind)=>{
                    if(ele.name==service) {
                        indx=ind;
                    }
                });
                findCart.services.splice(indx,1);
                await UserCart.updateOne({email:email},{
                    $set:{
                        services:findCart.services 
                    }
                });
            }
        }
        res.json({message:"removed from the Cart"});
    } catch (error) {
        res.send(error);
    }
}
const clearCart=async(req,res)=>{

    try {
        const {email}=req.query;
        const findCart=await UserCart.findOne({email:email});
        if(!findCart||(findCart.products.length==0&&findCart.services.length==0)){
            return res.json({message:"Cart already empty"})
        }
        
        findCart.products.splice(0,findCart.products.length);
        findCart.services.splice(0,findCart.services.length);
        
        await UserCart.updateOne({email:email},{
            $set:{
                products:findCart.products,
                services:findCart.services,
            }
        })
        res.json({message:"Cart cleared"});
    } catch (error) {
        res.send(error);
    }
}

const totalBill=async(req,res)=>{
    try{
        const {email}=req.query;
        const findCart=await UserCart.findOne({email:email});
        
        let productTotal=0;
        const prodArr=[];
        
        await Promise.all(findCart.products.map(async(ele)=>{
            const findProduct=await Product.findOne({productName:ele.name});
            
            const obj={
                name:findProduct.productName,
                price:findProduct.price,
                quantity:ele.quantity
            };


            //PA
            if(findProduct.price>1000&&findProduct.price<=50000){
                productTotal+=(((12/100)*findProduct.price)+findProduct.price)*ele.quantity;
                obj["Tax"]=[
                    {
                        Type:"SA",
                        PerItem: ((12/100)*findProduct.price)+findProduct.price,
                        TotalItem:(((12/100)*findProduct.price)+findProduct.price)*ele.quantity
                    }
                    
                ];
            }
            //PB
            else if(findProduct.price>5000){
                productTotal+=(((18/100)*findProduct.price)+findProduct.price)*ele.quantity;   
                obj["Tax"]=[
                    {
                        Type:"PB",
                        PerItem: ((18/100)*findProduct.price)+findProduct.price,
                        TotalItem:(((18/100)*findProduct.price)+findProduct.price)*ele.quantity
                    }
                    
                ];
            }
            //PC
            productTotal+=(findProduct.price+200)*ele.quantity;
            obj["Tax"]=[
                {
                    Type:"PC",
                    PerItem:findProduct.price+200,
                    TotalItem:(findProduct.price+200)*ele.quantity
                }
            ];
            prodArr.push(obj);
        }));
        

        let serviceTotal=0;
        let serviceArr=[];

        await Promise.all(findCart.services.map(async(ele)=>{
            const findService=await Services.findOne({serviceName:ele.name});
            
            const obj={
                name:findService.serviceName,
                price:findService.price,
                quantity:ele.quantity
            };
            
            //SA
            if(findService.price>1000&&findService.price<=80000){
                serviceTotal+=((10/100)*findService.price)+findService.price;
                obj["Tax"]=[
                    {
                        Type:"SA",
                        PerItem: ((10/100)*findService.price)+findService.price,
                        TotalItem:(((10/100)*findService.price)+findService.price)
                    }
                    
                ];
            }
            //SB
            else if(findService.price>8000){
                serviceTotal+=((15/100)*findService.price)+findService.price; 
                obj["Tax"]=[
                    {
                        Type:"SB",
                        PerItem: ((15/100)*findService.price)+findService.price,
                        TotalItem:(((15/100)*findService.price)+findService.price)
                    }
                    
                ];  
            }
            //SC
            serviceTotal+=findService.price+100;
            obj["Tax"]=[
                {
                    Type:"SC",
                    PerItem:findService.price+200,
                    TotalItem:(findService.price+200)
                }
            ];
            serviceArr.push(obj);

        }));
        const obj={
            Products:prodArr,
            Services:serviceArr,
            TotalBill:productTotal+serviceTotal
        };
        await UserCart.updateOne({email:email},{
            $set:{
                cost:obj
            }
        })
        res.json(obj);


    }catch(error){
        res.send(error);
    }
}

module.exports={createUser,clearCart,totalBill,viewAll,addProductToCart,removeProductFromCart};
