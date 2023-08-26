const mongoose=require("mongoose");;
const Schema = mongoose.Schema;

// Define the Product Schema
const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    description: String
});


module.exports=mongoose.model("Product",ProductSchema);