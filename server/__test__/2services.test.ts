const supertest=require("supertest");
const app=require("../utils/app.js");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
describe("services",()=>{
    beforeAll(async () => {
        await mongoose.connect(process.env.TEST);
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });
    describe('GET /api/service/viewservice',()=>{
        it("should get all the services",async()=>{
            const res=await supertest(app).get("/api/service/viewservice");
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('POST /api/service/addservice',()=>{
        it("able to post the products sucessfully",async()=>{
            const res=await supertest(app).post("/api/service/addservice").send({
                serviceName:"Azure Service",
                price:560,
                description:"This price is per hour rate" 
            });
            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe("New Service has been added");
        });
        describe("if price entered is equal to 0",()=>{
            it("It will give message -Please enter price greater than 0",async()=>{
                const res=await supertest(app).post("/api/service/addservice").send({
                    serviceName:"Azure Service",
                    price:0,
                    description:"This price is per hour rate" 
                });
                expect(res.body.error).toBe("Please enter price greater than 0");
            })
        })
    });
});

export {};