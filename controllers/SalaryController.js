const leaveService = require("../services/SalaryService");

exports.createSalary = async (req, res) => {
  try {
    const salary = await leaveService.createSalary(req.body);

    res.status(201).json({
      success: true,
      message: "Salary credit successfully",
      data: salary,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};