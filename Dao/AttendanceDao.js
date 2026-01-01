const {Attendance, User} = require('../models');

// Check user exists
exports.findUserById = (userId) => {
  return User.findByPk(userId);
};

// Create attendance
exports.createAttendance = (data) => {
  return Attendance.create(data);
};