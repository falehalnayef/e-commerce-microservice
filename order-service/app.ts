import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { rateLimiter } from "./middlewares/rateLimiterMiddleware";
import orderRoute from "./routes/orderRoute";
const app = express();

app.use(express.json());
//app.use(cors({ origin: "http://localhost:3000" }));
app.use(rateLimiter);
app.use("/orders", orderRoute);
app.use(errorMiddleware);   

export default app;