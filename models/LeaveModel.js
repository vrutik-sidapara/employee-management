module.exports = (sequelize, DataTypes) => {
  const Leave = sequelize.define(
    "Leave",
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

      reason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      total_days: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      approve_by: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },

      status: {
        type: DataTypes.STRING(20),
        defaultValue: "pending",
      },
    },
    {
      tableName: "leaves",
      timestamps: true,
      underscored: true,
    }
  );

  Leave.associate = (models) => {
  Leave.belongsTo(models.User, {
    foreignKey: "user_id",
    as: "user",
  });

  Leave.belongsTo(models.User, {
    foreignKey: "approve_by",
    as: "approver",
  });
};

  return Leave;
};
