const bcrypt = require("bcrypt");
const userDao = require("../Dao/UserDao");

/**
 * Create new user
 */
exports.createUser = async (data) => {
  const { firstname, lastname, email, password, role_id } = data;

  if (!firstname || !lastname || !email || !password || !role_id) {
    const error = new Error("Required fields are missing");
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await userDao.findByEmail(email);
  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }

  const password_hash = await bcrypt.hash(password, 10);

  return userDao.createUser({
    ...data,
    password_hash,
  });
};

/**
 * Get all users
 */
exports.getAllUsers = async () => {
  return userDao.getAllUsers();
};

/**
 * Get user by ID
 */
exports.getUserById = async (id) => {
  const user = await userDao.getUserById(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

/**
 * Update user
 */
exports.updateUser = async (id, data) => {
  const user = await userDao.findByPk(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return userDao.updateUser(user, data);
};

/**
 * Delete user
 */
exports.deleteUser = async (id) => {
  const user = await userDao.findByPk(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return userDao.deleteUser(user);
};
