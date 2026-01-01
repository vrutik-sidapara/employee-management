module.exports = (sequelize, DataTypes) => {
  const Attendence = sequelize.define(
    "Attendence",
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

      check_in: {
        type: DataTypes.TIME,
      },

      check_out: {
        type: DataTypes.TIME,
      },

      work_hours: {
        type: DataTypes.DECIMAL(5, 2),
      },

      status: {
        type: DataTypes.STRING(20),
        defaultValue: "present",
      },
    },
    {
      tableName: "attendance",
      timestamps: true,
      underscored: true,

      hooks: {
        beforeCreate: (attendance) => {
          attendance.work_hours = calculateWorkHours(
            attendance.check_in,
            attendance.check_out
          );
        },

        beforeUpdate: (attendance) => {
          attendance.work_hours = calculateWorkHours(
            attendance.check_in,
            attendance.check_out
          );
        },
      },
    }
  );

  Attendence.associate = (models) => {
  Attendence.belongsTo(models.User, {
    foreignKey: "user_id",
    as: "user",
  });
};


  return Attendence;
};

/**
 * Utility function
 */
function calculateWorkHours(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;

  const start = new Date(`1970-01-01T${checkIn}`);
  const end = new Date(`1970-01-01T${checkOut}`);

  if (end <= start) {
    throw new Error("check_out must be after check_in");
  }

  const diffMs = end - start;
  const hours = diffMs / (1000 * 60 * 60);

  return Number(hours.toFixed(2));
}
