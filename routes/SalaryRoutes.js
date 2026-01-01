const express = require("express");
const router = express.Router();
const salaryController = require("../controllers/SalaryController");

router.post("/", salaryController.createSalary);

module.exports = router;
