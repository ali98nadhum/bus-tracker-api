const express  = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require('path');
const AuthRoutes =  require("./Routes/Auth/AuthRoutes");
const AdminRoutes = require("./Routes/Admin/AllRoutes");

const app = express();


// middleware
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/assets", express.static(path.join(__dirname, "assets")));


app.use("/api/v1/auth", AuthRoutes)
// Admin Routes
app.use("/api/v1/admin" , AdminRoutes)


// Run server
const port = process.env.PORT || 3000;
app.listen(port , () => console.log(`Server is run on port ${port}`));
