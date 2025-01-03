import app from "./app";
import initializeDatabase from "./database/scripts/createTables";

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, async () => {

    try {
        await initializeDatabase();
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error(error);
    }
    
  });
  
export default server;