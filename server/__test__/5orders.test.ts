const supertest=require("supertest");
const app=require("../utils/app.js");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
describe('orders',()=>{
    beforeAll(async () => {
        await mongoose.connect(process.env.TEST);
    });
    afterAll(async () => {
        await mongoose.connection.close();
    }); 
    describe('POST /api/order/confirm',()=>{
        it('confirms the order',async()=>{
            const res=await supertest(app).post('/api/order/confirm?email=wertgg234@gmail.com');
            expect(res.body.message).toBe("Order Confirmed");
        })

        describe('if cart is empty',()=>{
            it('then the result would be',async()=>{
                const res=await supertest(app).post('/api/order/confirm?email=bluststacks@gmail.com');
                expect(res.body.message).toBe("Cart empty.Please add something");
            });
        });
    });
});

export {};