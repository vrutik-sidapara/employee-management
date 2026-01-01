const AttendanceService = require("../services/AttendanceService");

exports.createAttendance = async (req, res) => {
  try {
    const attendance = await AttendanceService.createAttendance(req.body);

    res.status(201).json({
      success: true,
      message: "Today this user present",
      data: attendance,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};