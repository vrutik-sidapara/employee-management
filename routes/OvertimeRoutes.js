const express = require('express');
const router = express.Router()
const overtimeController = require("../controllers/OvertimeController")

router.use('/', overtimeController.createOvertime);

module.exports = router