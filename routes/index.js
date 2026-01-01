const express = require("express");
const router = express.Router();

const userRouter = require("./UserRoutes");
const leaveRoutes = require("./LeaveRoutes");
const salaryRouter = require("./SalaryRoutes");
const attendanceRouter = require("./AttendanceRoutes");
const overtimeRouter = require("./OvertimeRoutes");

router.use("/users", userRouter);
router.use("/users/leaves", leaveRoutes);
router.use("/users/salary", salaryRouter);
router.use("/users/attendance", attendanceRouter);
router.use("/users/overtime", overtimeRouter);

module.exports = router;
