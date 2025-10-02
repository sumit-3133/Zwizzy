import express from 'express'
import cors from 'cors'

import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import connectDB from './config/db.js';

//app config
const app = express()
const port = 4000

// server/app.js (or index.js)
const express = require('express');
const cors = require('cors');
const app = express();

const allowedOrigin = process.env.ALLOWED_ORIGIN || 'https://zwizzy-frontend.onrender.com';

// A robust CORS config that allows preflight and credentials if needed
const corsOptions = {
  origin: function(origin, callback) {
    // allow requests with no origin (e.g., curl, mobile apps)
    if (!origin) return callback(null, true);
    if (Array.isArray(allowedOrigin) ? allowedOrigin.includes(origin) : origin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: This origin is not allowed'));
    }
  },
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','Accept'],
  credentials: true, // set true if you use cookies/auth with credentials
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Ensure Express replies to preflight OPTIONS for all routes
app.options('*', cors(corsOptions));
app.use(express.json());

//db connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get("/",(req,res)=>{
        res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})

//mongodb+srv://dulanjalisenarathna93:E2JUb0zfaT2FVp8D@cluster0.exkxkun.mongodb.net/?
