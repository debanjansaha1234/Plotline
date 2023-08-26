
# API's Documentation

## Main Database – Plotline (process.env.MONGO)

### Admin credentials (already added): 
### name - Freedy
### email - bluestacks@gmail.com
### password-Pass123 
### *Can create new admins

### Users credentials (already added):
### name- Finn allen
### email- finallen234@gmail.com		
### password – fin123
### *Can create new users

### Products (already added):
### •	Shampoo
### •	Oil
### •	Bag
### •	Headphone
### •	Biscuit
### •	Mobile Phone
### •	Face Cream
### •	Plates
### •	Chips
### •	Table Cloth
### *Can create new products

### Services (already added):
### •	AWS
### •	Logistic Service
### •	Entertainment
### •	Alexa Service
### •	Repair Service
### •	Game Service
### •	Ion Service
### *Can create new services

## Database for automated testing (jest) –  testdb(process.env.TEST) 
### •	Created a different database for automated testing so that it should not disrupt the main database
### •	Try testing one by one test suites as many test suites are dependent on each other


# API's Documentation

## POST /api/admin/create
### This api will let you to add the admins into the database.
### name,email,password,phone fields needs to be given in the body.
### The password is hashed and then stored into the database

##  GET api/admin/vieworder?email=<email>
### This api gives all the order that have been placed till now and only admin can access this api

## POST /api/prod/addproduct
### This api will let you to add the products into the database.
### productName,price,quantity,description fields needs to given in the body

## GET /api/prod/viewproduct
### This api gives all the products that are there in the database

## GET /api/service/viewservice
### This api gives all the services that are there in the database

## POST /api/service/addservice
### This api will let you add the services into the database.
### serviceName,price fields needs to given in the body

## POST /api/user/register
### This api will let you add users into the database
### name,email,password,phone fields needs to be given in the body.
### The password is hashed and then stored into the database

## GET /api/user/view
### This api gives all the product and services that are in the database

## POST /api/user/addtocart?email=<email>
### This api lets to add a service or product into the cart.
### product,quantity fields needs to be given in the body if you want to add a product
### service fields needs to be given in the body if you want to add a service
### product,quantity,service all fields needs to be given if you want to add product and service

## POST /api/user/removecart?email=<email>
### This api lets you remove a product or service from the cart.
### product fields needs to given if you want to remove a product.
### service fields needs to given if you want to remove a service
### product,service fields needs to given if you want to remove both product and service

## POST /api/user/clearcart?email=<email>
### This api helps to clear your cart

## POST /api/user/bill?email=<email>
### This api will gives you the total bill and tax on individual items present in your cart.

## POST /api/order/confirm?email=<email>
### This api will confirm you order and clear you cart for the next order 


## POST /api/admin/create
### This api will let you to add the admins into the database.
### name,email,password,phone fields needs to be given in the body.
### The password is hashed and then stored into the database

##  GET api/admin/vieworder?email=<email>
### This api gives all the order that have been placed till now and only admin can access this api

## POST /api/prod/addproduct
### This api will let you to add the products into the database.
### productName,price,quantity,description fields needs to given in the body

## GET /api/prod/viewproduct
### This api gives all the products that are there in the database

## GET /api/service/viewservice
### This api gives all the services that are there in the database

## POST /api/service/addservice
### This api will let you add the services into the database.
### serviceName,price fields needs to given in the body

## POST /api/user/register
### This api will let you add users into the database
### name,email,password,phone fields needs to be given in the body.
### The password is hashed and then stored into the database

## GET /api/user/view
### This api gives all the product and services that are in the database

## POST /api/user/addtocart?email=<email>
### This api lets to add a service or product into the cart.
### product,quantity fields needs to be given in the body if you want to add a product
### service fields needs to be given in the body if you want to add a service
### product,quantity,service all fields needs to be given if you want to add product and service

## POST /api/user/removecart?email=<email>
### This api lets you remove a product or service from the cart.
### product fields needs to given if you want to remove a product.
### service fields needs to given if you want to remove a service
### product,service fields needs to given if you want to remove both product and service

## POST /api/user/clearcart?email=<email>
### This api helps to clear your cart

## POST /api/user/bill?email=<email>
### This api will gives you the total bill and tax on individual items present in your cart.

## POST /api/order/confirm?email=<email>
### This api will confirm you order and clear you cart for the next order 