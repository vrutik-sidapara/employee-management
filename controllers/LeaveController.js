const leaveService = require("../services/LeaveService");

exports.createLeave = async (req, res) => {
  try {
    const leave = await leaveService.createLeave(req.body);

    res.status(201).json({
      success: true,
      message: "Leave applied successfully",
      data: leave,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
