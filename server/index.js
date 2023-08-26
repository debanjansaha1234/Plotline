
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const app=require("./utils/app.js");
dotenv.config();


const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
}
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

app.get("/",(req,res)=>{
    res.send("Starting page");
});

app.listen("8000",()=>{
    connect();
    console.log("Port running on 8000");
})

