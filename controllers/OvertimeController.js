const overtimeService = require("../services/OvertimeService");

exports.createOvertime = async (req, res) => {
  try {
    const overtime = await overtimeService.createOvertime(req.body);

    res.status(201).json({
      success: true,
      message: "This user worked overtime today",
      data: overtime,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
