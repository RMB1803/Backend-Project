import dotenv from 'dotenv'
import connectDB from './db/index.js'
import { app } from './app.js'

dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.on("ERROR", (error) => {
        console.log("ERROR: ", error);
    })

    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at Port: ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MONGO DB connection failed!!: ", error);
})









// import express from 'express'

// const app = express()

/* 
(async () => {
    try {
        mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

        app.on("ERROR", (error) => {
            console.log("ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("ERROR: ", error);
        throw error
    }
})()
*/