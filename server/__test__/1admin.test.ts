const supertest=require("supertest");
const app=require("../utils/app.js");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();

describe("admin",()=>{
    beforeAll(async () => {
        await mongoose.connect(process.env.TEST);
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });
    describe('POST /api/admin/create',()=>{
        describe('If already email present then ',()=>{
            it("it would give reply- Email already registered",async()=>{
                const res=await supertest(app).post("/api/admin/create").send({
                    name:"Freedy",
                    email:"bluststacks@gmail.com",
                    password:"pass123",
                    phone:"345533441"
                });
                expect(res.body.error).toBe("Email already registered");
            });
        });
        describe('If any field is missing ',()=>{
            it("it would give reply- Please fill all details",async()=>{
                const res=await supertest(app).post("/api/admin/create").send({
                    name:"Freedy",
                    password:"pass123",
                    phone:"345533441"
                });
                expect(res.body.error).toBe("Please Fill all details");
            });
        });
        it("should add new admins",async()=>{
            const res=await supertest(app).post("/api/admin/create").send({
                name:"new Freedy",
                email:"byebye@gmail.com",
                password:"bye123",
                phone:"345533441"
            });
            expect(res.body.message).toBe("Account has been created");
        });
    });
    describe('GET api/admin/vieworder -> Only for Admin',()=>{
        it('if admin is verified then all orders will shown',async()=>{
            const res=await supertest(app).get('/api/admin/vieworder?email=bluststacks@gmail.com');
            expect(res.body.Orders.length).toBeGreaterThanOrEqual(0);
        });
        describe('if any other user trying to access',()=>{
            it('it show that - This API can be accessed by admins only',async()=>{
                const res=await supertest(app).get('/api/admin/vieworder?email=blustsacks@gmail.com');
                expect(res.body.message).toBe("This API can be accessed by admins only");
            });
        });
    });
       
});

export {};
