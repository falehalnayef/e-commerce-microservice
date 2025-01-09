import app from "./app";
import connectDB  from "./database/db";

const PORT = process.env.PORT || 3003;

const server = app.listen(PORT, async () => {

    try {
        await connectDB();
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error(error);
    }
    
  });
  
export default server;