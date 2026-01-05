const { Leave, User } = require("../models");

// Check user exists
exports.findUserById = (userId) => {
  return User.findByPk(userId);
};

// Create leave
exports.createLeave = (data) => {
  return Leave.create(data);
};
