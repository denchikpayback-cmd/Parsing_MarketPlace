import express from 'express';
import userRouter from './routers/user_router.js'; 
import productRouter from "./routers/product_router.js"
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middleware/auth.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true  
}));
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/product', authMiddleware, productRouter)


 
app.listen(3001, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("Server OK on port 3001");
});

