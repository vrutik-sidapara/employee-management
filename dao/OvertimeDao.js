const { Overtime, User } = require("../models");

// Check user exists
exports.findUserById = (userId) => {
  return User.findByPk(userId);
};

// Create overtime
exports.createOvertime = (data) => {
  return Overtime.create(data);
};
