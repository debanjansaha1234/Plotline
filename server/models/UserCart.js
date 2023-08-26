const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const UserCartSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true 
    },
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
    }],
    cost:{
        type:Object
    }
    
});

module.exports=mongoose.model('UserCart', UserCartSchema);
