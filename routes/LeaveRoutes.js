const express = require("express");
const router = express.Router({ mergeParams: true });
const leaveController = require("../controllers/LeaveController");

router.post("/", leaveController.createLeave);

module.exports = router;
