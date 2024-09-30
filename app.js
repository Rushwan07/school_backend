const express = require("express");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

const userRouter = require("./src/routes/usersRouter");
const studentRouter = require("./src/routes/studentRouters");
const attendanceRouter = require("./src/routes/attendanceRouter");
const permisionRouter = require("./src/routes/permisionRouter");
const feesRouter = require("./src/routes/feesRouter");
const reportRouter = require("./src/routes/reportRouter");
const transportRouter = require("./src/routes/transportationRouter");
const assesmentRouter = require("./src/routes/assesmentRouter");
const communicationRouter = require("./src/routes/communicationRouter");

const AppError = require("./src/utils/appError");
const globalErrorHandler = require("./src/controllers/errorController");

const app = express();

// CORS setup
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://your-production-url.com"],
//     credentials: true,
//   })
// );

app.use(express.json());
// app.use(cookieParser());

// Define your routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/permision", permisionRouter);
app.use("/api/v1/fees", feesRouter);
app.use("/api/v1/report", reportRouter);
app.use("/api/v1/transport", transportRouter);
app.use("/api/v1/assesment", assesmentRouter);
app.use("/api/v1/communication", communicationRouter);

// Test route to confirm API is running
app.get("/", (req, res) => {
    res.send("API is running...");
});
// Handling undefined routes
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
