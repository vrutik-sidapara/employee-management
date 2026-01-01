module.exports = (sequelize, DataTypes) => {
  const Overtime = sequelize.define(
    "Overtime",
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

      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      hours: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },

      rate_per_hour: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
      },

      status: {
        type: DataTypes.STRING(20),
        defaultValue: "pending",
      },
    },
    {
      tableName: "overtime",
      timestamps: true,
      underscored: true,

      hooks: {
        beforeCreate: (overtime) => {
          overtime.total_amount = calculateTotal(overtime);
        },
        beforeUpdate: (overtime) => {
          overtime.total_amount = calculateTotal(overtime);
        },
      },
    }
  );

  Overtime.associate = (models) => {
  Overtime.belongsTo(models.User, {
    foreignKey: "user_id",
    as: "user",
  });
};

  return Overtime;
};

/* 🔧 Utility */
function calculateTotal(overtime) {
  if (!overtime.hours || !overtime.rate_per_hour) return 0;

  return Number(
    (overtime.hours * overtime.rate_per_hour).toFixed(2)
  );
}
