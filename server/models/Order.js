//mapping User to UserCart values
const mongoose=require("mongoose");

const OrderSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    orders:[
        {
            products: [{
                name:{
                    type:String,
                },
                quantity:{
                    type:Number,
                }
            }],  
            services:[{
                name:{
                    type:String,
                }
            }] ,
            cost:{
                type:Object
            } 
        }
    ]

});

module.exports=mongoose.model("Order",OrderSchema);
