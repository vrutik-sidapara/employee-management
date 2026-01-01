const { Salary, User } = require("../models");

// Check user exists
exports.findUserById = (userId) => {
  return User.findByPk(userId);
};

// Create salary
exports.createSalary = (data) => {
  return Salary.create(data);
};