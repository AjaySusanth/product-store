import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'

import productRoutes from './routes/productRoutes.js'
import { sql } from './config/db.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))

const PORT = process.env.PORT || 3000

app.get("/",(req,res)=>{
    res.send("Test response")
})

app.use("/api/products",productRoutes)

async function initDB() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        img VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `
        console.log("DB initialised")
    } catch (error) {
        console.error("Error initialising db",error)
    }
}

initDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server running")
    })
})