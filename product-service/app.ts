import express from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { rateLimiter } from "./middlewares/rateLimiterMiddleware";
import productRoute from "./routes/productRoute";
import { authenticateCommunicationToken } from "./middlewares/communicationMiddleware";
const app = express();

app.use(express.json());
app.use(rateLimiter);
app.use(authenticateCommunicationToken);
app.use("/uploads", express.static("uploads"));
app.use("/products", productRoute);

app.use(errorMiddleware);   

export default app;