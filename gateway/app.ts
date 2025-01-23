import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import axios, { AxiosRequestConfig } from "axios";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

const serviceMap: Record<string, string> = {
  users: "http://localhost:3001", // User Service
  products: "http://localhost:3002", // Product Service
  orders: "http://localhost:3003", // Order Service
};

app.use("/gateway/:service", async (req: any, res: any, _next: NextFunction) => {
  const { service } = req.params;

  const serviceUrl = serviceMap[service];
  if (!serviceUrl) {
    return res.status(404).json({ message: `Service '${service}' not found` });
  }

  try {
    const token = jwt.sign({ id: "na" }, process.env.JWT_COMM_SECRET || "default_secret", {
      expiresIn: "5m",
    });


    const axiosConfig: AxiosRequestConfig = {
      method: req.method as any,
      url: `${serviceUrl}${req.originalUrl.replace(`/gateway`, "")}`, 
      headers: {
        ...req.headers,
        authorizationComm: token,
      },
      data: req.body,
    };

    const response = await axios(axiosConfig);

    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || "Error forwarding request",
    });
  }
});

app.use("*", (_req, res) => {
  res.status(404).json({ message: "Invalid route" });
});

export default app;
