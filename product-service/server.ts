import app from "./app";

const PORT = process.env.PORT || 3002;

const server = app.listen(PORT, async () => {

    try {
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error(error);
    }
    
  });
  
export default server;