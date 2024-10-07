const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppError = require("./src/utils/appError");
const globalErrorHandler = require("./src/controllers/errorController");

const userRouter = require("./src/routes/usersRouter");

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173", // Your frontend's URL
        credentials: true, // Allow credentials (cookies)
    })
);
app.use(cookieParser());

app.use(express.json());

app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
