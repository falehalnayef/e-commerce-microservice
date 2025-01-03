import express from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import { createUserValidator } from "./validators/userValidator";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

app.use(express.json());
//app.use(cors({ origin: "http://localhost:3000" }));

app.use('/users', userRoutes);

app.use(errorMiddleware);   

export default app;