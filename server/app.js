const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')
require('dotenv').config()
require("cookie-parser")
const cors = require("cors");
const app = express();

app.use(cors());

app.use(cookieParser())
app.use(express.json())


app.use(require("./router/auth"))
app.use(require("./router/blogPost"))

// taking path and port from dotenv for starting the port and connecting to database
const port  = process.env.PORT || 5002
const path = process.env.DB_PATH

// connecting to the Database
mongoose.connect("mongodb+srv://jayrambagal:jayram1234@cluster0.pfm45vg.mongodb.net/test")
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

// connectiong to the server on port  
app.listen(port,async ()=>{
  console.log(`Your port is ${port}`)
});