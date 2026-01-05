const redisClient = require("../config/redis");
const userService = require("../services/UserService");

/**
 * Create new user
 * POST /api/users
 */
exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

/**
 * Get all users
 * GET /api/users
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get user by ID
 * GET /api/users/:id
 */
// exports.getUserById = async (req, res) => {
//   try {
//     const user = await userService.getUserById(req.params.id);

//     return res.status(200).json({
//       success: true,
//       data: user,
//     });
//   } catch (error) {
//     return res.status(error.statusCode || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const cacheKey = `user:${userId}`;

    const cachedUser = await redisClient.get(cacheKey);
    if (cachedUser) {
      return res.status(200).json({
        success: true,
        data: JSON.parse(cachedUser),
        source: "redis",
      });
    }

    const user = await userService.getUserById(userId);

    await redisClient.set(cacheKey, JSON.stringify(user), { EX: 60 });

    return res.status(200).json({
      success: true,
      data: user,
      source: "database",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update user
 * PUT /api/users/:id
 */
// exports.updateUser = async (req, res) => {
//   try {
//     const user = await userService.updateUser(req.params.id, req.body);

//     return res.status(200).json({
//       success: true,
//       message: "User updated successfully",
//       data: user,
//     });
//   } catch (error) {
//     return res.status(error.statusCode || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await userService.updateUser(userId, req.body);

    await redisClient.del(`user:${userId}`);

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete user
 * DELETE /api/users/:id
 */
// exports.deleteUser = async (req, res) => {
//   try {
//     await userService.deleteUser(req.params.id);

//     return res.status(200).json({
//       success: true,
//       message: "User deleted successfully",
//     });
//   } catch (error) {
//     return res.status(error.statusCode || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await userService.deleteUser(userId);

    await redisClient.del(`user:${userId}`);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
