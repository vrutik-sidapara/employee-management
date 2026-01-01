const Sequelize = require("sequelize");
const config = require("../config/config");
require("dotenv").config();

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ✅ Load ALL models
db.User = require("./UserModel")(sequelize, Sequelize.DataTypes);
db.Role = require("./RoleModel")(sequelize, Sequelize.DataTypes); // 🔥 MISSING LINE
db.Leave = require("./LeaveModel")(sequelize, Sequelize.DataTypes);
db.Salary = require("./SalaryModel")(sequelize, Sequelize.DataTypes);
db.Attendance = require("./AttendenceModel")(sequelize, Sequelize.DataTypes);
db.Overtime = require("./OvertimeModel")(sequelize, Sequelize.DataTypes);

// ✅ Call associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Test connection
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to database:", err);
  });

module.exports = db;
