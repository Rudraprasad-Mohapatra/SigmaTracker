require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Cross Origin Request
const connectToDb = require('./config/db.js')

const app = express();

//Express Middleware 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors());
// init connection to db
connectToDb();

const userRoutes = require('./routes/userRoute.js'); //Bringing router

app.use("/",userRoutes);

module.exports = app;