const attendanceDao = require("../dao/AttendanceDao");

exports.createAttendance = async (data) => {
  const { user_id, date, check_in, check_out } = data;

  // ✅ Validation (Service responsibility)
  if (!user_id || !date || !check_in || !check_out) {
    const error = new Error("Required fields are missing");
    error.statusCode = 400;
    throw error;
  }

  // ✅ Business rule: user must exist
  const user = await attendanceDao.findUserById(user_id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  // ✅ DB call via DAO
  return attendanceDao.createAttendance(data);
};
