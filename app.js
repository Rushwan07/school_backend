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
const classRouter = require("./src/routes/classRouter");
const extracurricularRouter = require("./src/routes/extracurricularRouter");
const specialClassRouter = require("./src/routes/specialClassesRouter");
const timeTableRouter = require("./src/routes/timeTableRouter");
const invoiceRouter = require("./src/routes/invoiceRouter");
const subjectRouter = require("./src/routes/subjectRouter");
const teacherRouter = require("./src/routes/teacherRouter");
const parentRouter = require("./src/routes/parentRouter");
const announcementRouter = require("./src/routes/announcementRouter");
const gradetRouter = require("./src/routes/gradeRouter");
const resultRouter = require("./src/routes/resultRouter");
const examRouter = require("./src/routes/examRouter");
const eventRouter = require("./src/routes/eventRouter");
const lessonRouter = require("./src/routes/lessonRouter");
const assignmentRouter = require("./src/routes/assignmentRouter");

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
app.use("/api/v1/class", classRouter);
app.use("/api/v1/extracurricular", extracurricularRouter);
app.use("/api/v1/specialclass", specialClassRouter);
app.use("/api/v1/timetable", timeTableRouter);
app.use("/api/v1/invoice", invoiceRouter);
app.use("/api/v1/subject", subjectRouter);
app.use("/api/v1/teacher", teacherRouter);
app.use("/api/v1/parent", parentRouter);
app.use("/api/v1/announcement", announcementRouter);
app.use("/api/v1/grade", gradetRouter);
app.use("/api/v1/result", resultRouter);
app.use("/api/v1/exam", examRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/lesson", lessonRouter);
app.use("/api/v1/assignment", assignmentRouter);

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
