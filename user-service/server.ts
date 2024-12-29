import app from "./app";
import initializeDatabase from "./database/scripts/createTables";

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {

    try {
        await initializeDatabase();
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error(error);
    }
    
  });
  
