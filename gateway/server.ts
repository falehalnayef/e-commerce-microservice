import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, async () => {

    try {
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error(error);
    }
    
  });
  
export default server;