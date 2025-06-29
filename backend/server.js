const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors')
const userRouter = require('./routes/user.routes');
const PORT = process.env.PORT || 4000;
const connectDB = require('./db/db')




app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

connectDB()


app.get('/',(req,res)=>{
    res.send('Hello from the backend!');
})

app.use('/users', userRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})