import express from 'express';
import cors from 'cors'
import foodRouter from "./routers/food.router.js";

const app = express();

app.use(cors({
    credentials: true,
    origin: ('http://172.25.254.238:5173/')
}));

app.use('/api/foods', foodRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});