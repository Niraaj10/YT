import dotenv from 'dotenv'
import connectDB from "./db/db.js";
import { app } from './app.js';

dotenv.config({
    path: './env'
})

const PORT = process.env.PORT || 8000

connectDB()
.then(() => {
    app.on("errror", (error) => {
        console.log("ERRR: ", error);
        throw error
    })

    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`)
    })
})
.catch((err) => {
    console.log("DB connection error: ", err);
})








/*
import mongoose from 'mongoose';
import { DB_NAME } from './constants';

import express from "express"
const app = express()

;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/

