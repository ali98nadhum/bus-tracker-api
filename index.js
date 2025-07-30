const express  = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require('path');


const app = express();


// middleware
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/assets", express.static(path.join(__dirname, "assets")));

// User Routes
app.use("/api/v1/auth" , require("./Routes/User/AuthRoutes"));
// Driver Routes
app.use("/api/v1/driver/auth" , require("./Routes/Driver/AuthRoutes"));


// Run server
const port = process.env.PORT || 3000;
app.listen(port , () => console.log(`Server is run on port ${port}`));
