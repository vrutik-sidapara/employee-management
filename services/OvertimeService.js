const overtimeDao = require('../Dao/OvertimeDao');

exports.createOvertime = async (data) => {
  const { user_id, date, hours, rate_per_hour } = data;

  if (!user_id || !date || hours == null || rate_per_hour == null) {
    const error = new Error("Required fields are missing");
    error.statusCode = 400;
    throw error;
  }

  const user = await overtimeDao.findUserById(user_id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return overtimeDao.createOvertime(data);
};
