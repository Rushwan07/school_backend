const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppError = require("./src/utils/appError");
const globalErrorHandler = require("./src/controllers/errorController");

const userRouter = require("./src/routes/usersRouter");
const teacherRouter = require("./src/routes/teacherRouter");
const studentRouter = require("./src/routes/studentRouter");
const subjectRouter = require("./src/routes/subjectRouter");
const classRouter = require("./src/routes/classRouter");
const transportRouter = require("./src/routes/transportRouter");
const anouncementRouter = require("./src/routes/anouncementRouter");
const assignmentRouter = require("./src/routes/assignmentRouter");
const attendanceRouter = require("./src/routes/attendanceRouter");
const eventRouter = require("./src/routes/eventsRouter");
const examRouter = require("./src/routes/examRouter");
const extraCurricularRouter = require("./src/routes/extraCurricularRouter");
const feesRouter = require("./src/routes/feesRouter");
const gradeRouter = require("./src/routes/gradeRouter");
const resultsRouter = require("./src/routes/resultRouter");

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
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/classes", classRouter);
app.use("/api/v1/transports", transportRouter);
app.use("/api/v1/anouncements", anouncementRouter);
app.use("/api/v1/assignments", assignmentRouter);
app.use("/api/v1/attendances", attendanceRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/exams", examRouter);
app.use("/api/v1/activitys", extraCurricularRouter);
app.use("/api/v1/fees", feesRouter);
app.use("/api/v1/grades", gradeRouter);
app.use("/api/v1/results", resultsRouter);

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
