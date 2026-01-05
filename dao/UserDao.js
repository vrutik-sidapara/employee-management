const {
  User,
  Role,
  Attendance,
  Leave,
  Salary,
  Overtime,
} = require("../models");

exports.findByEmail = (email) => {
  return User.findOne({ where: { email } });
};

exports.createUser = (data) => {
  return User.create(data);
};

exports.getAllUsers = () => {
  return User.findAll({
    attributes: { exclude: ["password_hash"] },
    include: [{ model: Role, as: "role" }],
  });
};

exports.getUserById = (id) => {
  return User.findOne({
    where: { user_id: id },
    attributes: { exclude: ["password_hash"] },
    include: [
      { model: Role, as: "role" },
      { model: Attendance, as: "attendance" },
      { model: Leave, as: "leaves" },
      { model: Leave, as: "approvedLeaves" },
      { model: Salary, as: "salaries" },
      { model: Overtime, as: "overtimes" },
    ],
  });
};

exports.findByPk = (id) => {
  return User.findByPk(id);
};

exports.updateUser = (user, data) => {
  return user.update(data);
};

exports.deleteUser = (user) => {
  return user.destroy();
};
