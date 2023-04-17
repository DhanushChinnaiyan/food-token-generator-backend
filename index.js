import express from 'express';
import cors from 'cors'
import databaseconnection from './db.js';
import { customerSignupRouter } from './routes/customer routes/signup.js';
import { ownerSignupRouter } from './routes/owner routes/signup.js';
import { customerLoginRouter } from './routes/customer routes/login.js';
import { ownerLoginRouter } from './routes/owner routes/login.js';
import { forgotCustomerRouter } from './routes/customer routes/forgotpassword.js';
import { forgotOwnerRouter } from './routes/owner routes/forgotpassword.js';
import { ownerfoodRouter } from './routes/owner routes/food.js';
import { profitGetRouter } from './routes/owner routes/profit.js';
import customersignedIn from './controller/customerAuthorization.js';
import { customerRouter } from './routes/customer routes/food.js';
import ownersignedIn from './controller/ownerAuthorization.js';
import { customerCartRouter } from './routes/customer routes/cart.js';
import { ownerCartRouter } from './routes/owner routes/cart.js';
import { customertokenRouter } from './routes/customer routes/token.js';
import { ownerTokenRouter } from './routes/owner routes/token.js';
import { customergetRouter } from './routes/owner routes/customer.js';



// data base connection

databaseconnection();

const app=express();
const port =9000;


// middlewares
app.use(express.json())
app.use(cors())

// routers

// customer router
app.use("/customer/signup",customerSignupRouter)
app.use("/customer/login",customerLoginRouter)
app.use("/customer/forgotpassword",forgotCustomerRouter)



// owner router
app.use("/owner/signup",ownerSignupRouter)
app.use("/owner/login",ownerLoginRouter)
app.use("/owner/forgotpassword",forgotOwnerRouter)
app.use("/customer",ownersignedIn,customergetRouter)

// food router
app.use("/customer",customersignedIn,customerRouter)
app.use("/owner",ownersignedIn,ownerfoodRouter)

// profit router
app.use("/profit",ownersignedIn,profitGetRouter)

// cart router
app.use("/cart",customersignedIn,customerCartRouter)
app.use("/ownercart",ownersignedIn,ownerCartRouter)

// token router
app.use("/token",customersignedIn,customertokenRouter)
app.use("/ownertoken",ownersignedIn,ownerTokenRouter)
app.listen(port)