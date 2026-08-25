const express  = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require('path');
const http = require('http');
const { Server } = require("socket.io");
const socketHandler = require('./Sockets/socketHandler');


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
app.use("/api/v1/destinations" , require("./Routes/User/DestinationRoutes"));
// Driver Routes
app.use("/api/v1/driver/auth" , require("./Routes/Driver/AuthRoutes"));
app.use("/api/v1/driver/trip" , require("./Routes/Driver/TripRoutes"));
// Admin Routes
app.use("/api/v1/admin/destination" , require("./Routes/Admin/destinationRoutes"))
app.use("/api/v1/admin/drivers" , require("./Routes/Admin/DriverRoutes"))


// Run server
const port = process.env.PORT || 3000;
const server = http.createServer(app);

// Setup Socket.io
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});
socketHandler(io);

server.listen(port , () => console.log(`Server is run on port ${port}`));
