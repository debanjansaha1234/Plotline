const UserCart=require("../models/UserCart.js");
const Order =require("../models/Order.js");
const Product =require("../models/Product.js");

const confirmOrder=async(req,res)=>{
    try {
        const {email}=req.query;
        const findCart=await UserCart.findOne({email:email});
        if(!findCart||(findCart.products.length==0&&findCart.services.length==0)){
            return res.send({message:"Cart empty.Please add something"});
        }
        const findOrder=await Order.findOne({email:email});

        if(!findOrder){
            const cost=findCart.cost;
        
            const orders=[{
                products:findCart.products,
                services:findCart.services,
                cost
            }];
            
            await Promise.all(findCart.products.map(async (ele)=>{
                const findProd=await Product.findOne({productName:ele.name});
                await Product.updateOne({productName:ele.name},{
                    $set:{
                        quantity:findProd.quantity-ele.quantity
                    }
                });
            }));

           

            const saveOrder=new Order({email,orders});
            await saveOrder.save();

            await UserCart.updateOne({email:email},{
                $set:{
                    products:[],
                    services:[],
                    cost:{},
                }
            });
           

            return res.status(201).json({message:"Order Confirmed"});
        }
        else{
            
            const prodArr=findCart.products;
            const serArr=findCart.services;
            const costObj=findCart.cost;
            const newOrder={
                products:prodArr,
                services:serArr,
                cost:costObj
            };
            const arr=[...findOrder.orders,newOrder]
            console.log(arr);

            await Order.updateOne({email:email},{
                $set:{
                    orders:arr
                }
            });

            await Promise.all(findCart.products.map(async (ele)=>{
                const findProd=await Product.findOne({productName:ele.name});
                
                await Product.updateOne({productName:ele.name},{
                    $set:{
                        quantity:findProd.quantity-ele.quantity
                    }
                });
            }));

            await UserCart.updateOne({email:email},{
                $set:{
                    products:[],
                    services:[],
                    cost:{}
                }
            });
            res.status(201).json({message:"Order Confirmed"});
        }
    } catch (error) {
        res.send(error);
    }

}

module.exports={confirmOrder}