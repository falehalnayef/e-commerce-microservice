import express from "express";
import cors from "cors";
import axios from "axios";
import jwt from "jsonwebtoken";
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/users", async (req, res) => {
    try {
      const response = await axios.get("afdasdfasau");
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ message: "Error forwarding request" });
    }
  });
  
  
export default app;