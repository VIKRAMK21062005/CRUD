// controllers/userController.js
import User from "../models/User.js";

/**
 * Helper for consistent JSON responses
 */
const sendResponse = (res, status = 200, success = true, message = "", data = null) => {
  const payload = { success, message };
  if (data !== null) payload.data = data;
  return res.status(status).json(payload);
};

/**
 * CREATE USER
 */
export const createUser = async (req, res) => {
  try {
    // Basic validation: ensure required fields exist
    const { name, message } = req.body;
    if (!name || !message) {
      return sendResponse(res, 400, false, "Both 'name' and 'message' are required.");
    }

    // Create and return the created document
    const user = await User.create({ name, message });

    // respond with created document (201)
    return sendResponse(res, 201, true, "User created successfully", user);
  } catch (error) {
    console.error("createUser error:", error);
    return sendResponse(res, 500, false, error.message || "Server error");
  }
};

/**
 * GET ALL USERS
 */
export const getUser = async (req, res) => {
  try {
    // fetch all users, newest first
    const users = await User.find().sort({ date: -1 });
    return sendResponse(res, 200, true, "Users fetched successfully", users);
  } catch (error) {
    console.error("getUser error:", error);
    return sendResponse(res, 500, false, error.message || "Server error");
  }
};

/**
 * UPDATE USER
 */
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    // optional: validate payload is not empty
    if (!req.body || Object.keys(req.body).length === 0) {
      return sendResponse(res, 400, false, "Request body is empty. Provide fields to update.");
    }

    // find and update; return the new document and run validators
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    return sendResponse(res, 200, true, "User updated successfully", user);
  } catch (error) {
    console.error("updateUser error:", error);
    return sendResponse(res, 500, false, error.message || "Server error");
  }
};

/**
 * DELETE USER
 */
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    // return deleted document if you want, or just a message
    return sendResponse(res, 200, true, "User deleted successfully", user);
  } catch (error) {
    console.error("deleteUser error:", error);
    return sendResponse(res, 500, false, error.message || "Server error");
  }
};
