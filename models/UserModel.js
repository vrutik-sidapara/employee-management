module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      firstname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      contact_no: {
        type: DataTypes.STRING(15),
      },
      address: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },
    },
    {
      tableName: "users",
      timestamps: true,
      underscored: true,
    }
  );

  User.associate = (models) => {
    // Role
    User.belongsTo(models.Role, {
      foreignKey: "role_id",
      as: "role",
    });

    // Attendance
    User.hasMany(models.Attendance, {
      foreignKey: "user_id",
      as: "attendance",
    });

    // Leaves created by user
    User.hasMany(models.Leave, {
      foreignKey: "user_id",
      as: "leaves",
    });

    // Leaves approved by user (self reference)
    User.hasMany(models.Leave, {
      foreignKey: "approve_by",
      as: "approvedLeaves",
      constraints: false,
    });

    // Salary
    User.hasMany(models.Salary, {
      foreignKey: "user_id",
      as: "salaries",
    });

    // Overtime
    User.hasMany(models.Overtime, {
      foreignKey: "user_id",
      as: "overtimes",
    });
  };

  return User;
};
