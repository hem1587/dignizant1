const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const formRoutes = require("./Routes/FormRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Use form routes
app.use("/api/form", formRoutes);

app.listen(PORT,async () => {
    try {
        await db.connection
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.log(error,"error")
    }
    
  
});
