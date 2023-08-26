const supertest=require("supertest");
const app=require("../utils/app.js");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();

describe('product', () => { 
    beforeAll(async () => {
        await mongoose.connect(process.env.TEST);
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });
    describe('GET /api/prod/viewproduct',()=>{
        it("should get all the products",async()=>{
            const res=await supertest(app).get("/api/prod/viewproduct");
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('POST /api/prod/addproduct',()=>{
        it("able to post the products sucessfully",async()=>{
            const res=await supertest(app).post("/api/prod/addproduct").send({
                productName:"Oil",
                price:560,
                quantity:2,
                description:"This is oil" 
            });
            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe("New product has been added");
        });
        describe("if price entered is equal to 0",()=>{
            it("It will give message -Please enter price greater than 0",async()=>{
                const res=await supertest(app).post("/api/prod/addproduct").send({
                    productName:"Oil",
                    price:0,
                    quantity:2000,
                    description:"This is olive oil" 
                });
                expect(res.body.error).toBe("Please enter price greater than 0");
            })
        })
    });
});








export {};