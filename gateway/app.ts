import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import axios, { AxiosRequestConfig } from "axios";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authenticateToken } from "./middlewares/authenticationMiddleware";
import { errorMiddleware } from "./middlewares/errorMiddleware";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

const serviceMap: Record<string, string> = {
  users: "http://localhost:3001", // User Service
  products: "http://localhost:3002", // Product Service
  orders: "http://localhost:3003", // Order Service
};

const publicPaths = ["/users/login", "/users/verify", "/users/send-otp", "/users/forgot-password"];




app.use("/gateway/:service", async (req: any, res: any, next: NextFunction) => {

  try{
  const { service } = req.params;

  const serviceUrl = serviceMap[service];
  if (!serviceUrl) {
    return res.status(404).json({ message: `Service '${service}' not found` });
  }
  const path = req.originalUrl.replace(`/gateway`, "");


  if (!(req.method === "POST" && path === "/users") && !publicPaths.includes(path)) {
    const token = req.headers['authorization'];

   req.userData = await authenticateToken(token);

}
    const token = jwt.sign({ id: "na" }, process.env.JWT_COMM_SECRET || "default_secret", {
      expiresIn: "5m",
    });

    const data = {
      userData: req.userData,
      ...req.body
    }

    const axiosConfig: AxiosRequestConfig = {
      method: req.method as any,
      url: `${serviceUrl}${path}`, 
      headers: {
        ...req.headers,
        authorizationComm: token,
      },
      data
    };

    const response = await axios(axiosConfig);

    res.status(response.status).json(response.data);
  } catch (error: any) {
    next(error);
  }
});

app.use(errorMiddleware);
 

app.use("*", (_req, res) => {
  res.status(404).json({ message: "Invalid route" });
});

export default app;
