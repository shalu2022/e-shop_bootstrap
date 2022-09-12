const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')
const path = require('path')

require('dotenv').config();
require('express-async-errors');



//express
const app = express()

//route
const authRoute = require('./route/authRoute')
const imageRoute = require('./route/imageRoute')
const productRoute = require('./route/productRoute')
const categoryRoute = require('./route/categoryRoute')
const orderRoute = require(`./route/orderRoute`)

//configaration
app.use(cors());
app.use(cookieParser(process.env.REF_TOKEN_SECRET));
app.use(fileUpload({
    useTempFiles: true
}))

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(`/api/v1/auth`, authRoute)
app.use(`/api/v1/image`, imageRoute)
app.use(`/api/v1/product`, productRoute)
app.use(`/api/v1/category`, categoryRoute)
app.use(`/api/v1/order`, orderRoute)

const PORT = process.env.PORT || 7000;
const connectDB = require('./db')


if(process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging"){
    app.use(express.static(`client/build`))
    app.use(`*`,(req, res)=>{
        res.sendFile(path.join(__dirname + `/client/build/index.html`))
    })
}

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, ()=>{
            console.log(`server is listening at the port http://localhost:${PORT}`)
        })
    }catch (err){
        // return res.status(500).json({msg: err.message})
        throw err;
    }
}

start();
