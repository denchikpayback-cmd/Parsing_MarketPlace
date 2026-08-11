import express from 'express';
import userRouter from './routers/user_router.js'; 
import cors from 'cors';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use('/user', userRouter);


app.listen(3001, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("Server OK on port 3001");
});

