import express, { application } from "express"
import bookRoute from "./route/bookRoute.js"
import userRoute from "./route/userRoute.js"
import connectDb from "./config/dbConnection.js"
import dotenv from "dotenv"


dotenv.config()
const app=express()
const PORT=process.env.PORT || 8000

connectDb()

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/books', bookRoute)
app.use('/users', userRoute)

app.listen(PORT, ()=>{
    console.log(`Server is now running at port ${PORT}`)
})