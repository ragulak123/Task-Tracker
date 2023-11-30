const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");
require("colors");

const db = require("./config/db");

const app = express();

app.use(express.static("./public"));

dotenv.config({ path: "./config/config.env" });

if (process.env.NODE_ENV === "development") app.use(logger("dev"));

app.use(cors());

// DB Connection
db(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/user", require("./router/user"));
app.use("/api/v1/admin", require("./router/admin"));

module.exports = app;
