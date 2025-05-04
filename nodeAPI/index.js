const express = require('express');
const cors = require('cors');
const server = express();
const cookieParser = require("cookie-parser");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors({
    origin: "http://localhost:5173", //Domínio permitido
    credentials: true
}));
server.use(cookieParser());

const UserRoutes = require('./Routes/UserRoutes');
server.use(UserRoutes);

const TaskRoutes = require("./Routes/TaskRoutes");
server.use(TaskRoutes);



server.listen(5050);