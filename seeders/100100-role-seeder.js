"use strict";

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface) => {
    const now = new Date();

    /* 1️⃣ ROLES */
    await queryInterface.bulkInsert("roles", [
      {
        role_id: 1,
        role_name: "Admin",
        role_type: "admin",
        status: 1,
        created_at: now,
        updated_at: now,
      },
      {
        role_id: 2,
        role_name: "Employee",
        role_type: "employee",
        status: 1,
        created_at: now,
        updated_at: now,
      },
    ]);

    /* 2️⃣ USERS */
    const adminUUID = uuidv4();
    const empUUID = uuidv4();

    await queryInterface.bulkInsert("users", [
      {
        firstname: "Admin",
        lastname: "User",
        email: "admin@example.com",
        password_hash: await bcrypt.hash("Admin@123", 10),
        role_id: 1,
        status: 1,
        created_at: now,
        updated_at: now,
      },
      {
        firstname: "Employee",
        lastname: "User",
        email: "employee@example.com",
        password_hash: await bcrypt.hash("Employee@123", 10),
        role_id: 2,
        status: 1,
        created_at: now,
        updated_at: now,
      },
    ]);

    /* 3️⃣ PROJECTS */
    await queryInterface.bulkInsert("projects", [
      {
        user_id: 1,
        project_name: "Employee Management System",
        start_date: "2025-01-01",
        end_date: null,
        status: "active",
        created_at: now,
        updated_at: now,
      },
      {
        user_id: 2,
        project_name: "Attendance Module",
        start_date: "2025-02-01",
        end_date: null,
        status: "active",
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("projects", null, {});
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("roles", null, {});
  },
};
