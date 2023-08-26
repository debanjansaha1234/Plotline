
const supertest=require("supertest");
const app=require("../utils/app.js");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
describe('user',()=>{
    beforeAll(async () => {
        await mongoose.connect(process.env.TEST);
    });
    afterAll(async () => {
        await mongoose.connection.close();
    }); 
    describe('POST /api/user/register',()=>{
        it("should add new users",async()=>{
            const res=await supertest(app).post("/api/user/register").send({
                name:"Freedy",
                email:"blusts3tacks@gmail.com",
                password:"pass123",
                phone:"345533441"
            });
            expect(res.body.message).toBe("Account has been created");
        });
        describe('If already email present then ',()=>{
            it("it would give reply- Email already registered",async()=>{
                const res=await supertest(app).post("/api/admin/create").send({
                    name:"Freedy",
                    email:"bluststacks@gmail.com",
                    password:"gal123",
                    phone:"345573441"
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

    });
    describe('GET /api/user/view',()=>{
        it("it would give all the products and service",async()=>{
            const res=await supertest(app).get("/api/user/view");
            expect(res.statusCode).toBe(200);
            expect(res.body.Services.length).toBeGreaterThanOrEqual(0);
            expect(res.body.Products.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('POST /api/user/addtocart',()=>{
        it('it will add one product and service to the user cart',async()=>{
            const res=await supertest(app).post("/api/user/addtocart?email=wertgg234@gmail.com").send({
                "product":"Comforter",
                "quantity":"1",
            });
            expect(res.body.message).toBe("Added to the cart");
        });
        describe('adding products that are not there',()=>{
            it('it would give result - No such Product found ',async()=>{
                const res=await supertest(app).post("/api/user/addtocart?email=wertgg234@gmail.com").send({
                    "product":"TV",
                    "quantity":"1",
                });
                expect(res.body.message).toBe("No such Product found");
            });

        });
        describe('adding products quantity more than present stock',()=>{
            it('it would give result -Cannot add more quantity than present stocks',async()=>{
                const res=await supertest(app).post("/api/user/addtocart?email=wertgg234@gmail.com").send({
                    "product":"Oil",
                    "quantity":"9000",
                });
                expect(res.body.message).toBe("Cannot add more quantity than present stocks");
            });

        });
        
    });

    describe('POST /api/user/removecart',()=>{
        describe('if cart is empty',()=>{
            it('it would give result - Your Cart is Empty',async()=>{
                const res=await supertest(app).post("/api/user/removecart?email=bluststacks@gmail.com").send({
                    "product":"Olive Oil",
                });
                expect(res.body.message).toBe("Your Cart is Empty");
            });
        });
        it('it remove product and service from user cart',async()=>{
            const res=await supertest(app).post("/api/user/removecart?email=natallen234@gmail.com").send({
                "product":"Airpods",
            });
            expect(res.body.message).toBe("removed from the Cart");
        });

        describe('removing products that are not there in the cart',()=>{
            it('it would give result - No such products is in the cart',async()=>{
                const res=await supertest(app).post("/api/user/removecart?email=natallen234@gmail.com").send({
                    "product":"TV",
                });
                expect(res.body.message).toBe("No such products is in the cart");
            });

        });
    });

    describe('POST /api/user/clearcart',()=>{
        it('if cart is cleared',async()=>{
            const res=await supertest(app).post("/api/user/clearcart?email=wertgg234@gmail.com");
        })
        describe('if cart is already empty',()=>{
            it('then the result - Cart cleared',async()=>{
                const res=await supertest(app).post("/api/user/clearcart?email=bluststacks@gmail.com");
                expect(res.body.message).toBe("Cart already empty");
            });
        });
    });

    describe('POST /api/user/bill',()=>{
        it('To check the bill and the taxes',async()=>{
            const res=await supertest(app).post("/api/user/bill?email=wertgg234@gmail.com");
            expect(res.body.TotalBill).toBeGreaterThanOrEqual(0);
        });
    });    

});

export {};