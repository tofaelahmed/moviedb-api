require("dotenv").config();
require("./database");
require("./auth/passport").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const allowCORS = require("./middlewares/cors");
const errorHandler = require("./middlewares/error-handler");

const usersRouter = require("./routes/api/user");
const moviesRouter = require("./routes/api/movie");

const app = express();

app.use(allowCORS);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/movies", moviesRouter);
app.use(errorHandler);

module.exports = app;
