module.exports = (sequelize, DataTypes) => {
  const Salary = sequelize.define(
    "Salary",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },

      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },

      total_days: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      status: {
        type: DataTypes.STRING(20),
        defaultValue: "unpaid",
      },
    },
    {
      tableName: "salary",
      timestamps: true,
      underscored: true,
    }
  );

  Salary.associate = (models) => {
  Salary.belongsTo(models.User, {
    foreignKey: "user_id",
    as: "user",
  });
};


  return Salary;
};
