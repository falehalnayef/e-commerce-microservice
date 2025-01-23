import express from "express";
import userRoutes from "./routes/userRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { rateLimiter } from "./middlewares/rateLimiterMiddleware";
import { authenticateCommunicationToken } from "./middlewares/communicationMiddleware";

const app = express();

app.use(express.json());
app.use(rateLimiter);
app.use(authenticateCommunicationToken)
app.use('/users', userRoutes);

app.use(errorMiddleware);   

export default app;