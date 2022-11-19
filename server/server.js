const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const configs = require("./configs/index.js");
const databases = require("./database/index.js");

/* Install Server Configs */
configs.installServerConfigs.installServerConfigs();
/* MongoDB Connection */
databases.connectMongoDb();

/* Custom Error Handler Middleware */
const customErrorHandler = require("./middlewares/error/customErrorHandler.js");
/* Routes */
const routes = require("./routes/index.js");

/* Express Server */
const server = express();

/* Express Static Files */
server.use("/images", express.static(path.join(__dirname, "public/images")));
server.use("/videos", express.static(path.join(__dirname, "public/videos")));

/* Middlewares */
server.use(cors());
server.use(cookieParser());
server.use(express.json());
server.use("/api", routes);
server.use(customErrorHandler);

/* Server */
server.listen(process.env.PORT, ()=> {
    console.log(`Server is running on localhost:${process.env.PORT}`)
});
