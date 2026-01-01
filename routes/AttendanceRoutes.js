const express = require("express");
const router = express.Router();
const AttendanceController = require("../controllers/AttendanceController");

router.use("/", AttendanceController.createAttendance);

module.exports = router;
