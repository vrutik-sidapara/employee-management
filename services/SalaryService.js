const salaryDao = require('../dao/SalaryDao');

exports.createSalary = async (data) => {
  const { user_id, total_days, amount, status } = data;

  // Validation
  if (!user_id || !total_days || !amount) {
    const error = new Error("Required fields are missing");
    error.statusCode = 400;
    throw error;
  }

  // Check user exists
  const user = await salaryDao.findUserById(user_id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return salaryDao.createSalary(data);
};
