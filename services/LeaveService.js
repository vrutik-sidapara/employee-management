const leaveDao = require('../dao/LeaveDao');

exports.createLeave = async (data) => {
  const { user_id, reason, start_date, end_date, total_days } =
    data;

  // Validation
  if (!user_id || !reason || !start_date || !end_date || !total_days) {
    const error = new Error("Required fields are missing");
    error.statusCode = 400;
    throw error;
  }

  // Check user exists
  const user = await leaveDao.findUserById(user_id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return leaveDao.createLeave(data);
};
