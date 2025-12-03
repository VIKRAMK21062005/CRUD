import express from "express";
import upload from "../middleware/upload.js";
import { createUser, getUsers, updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/", upload.single("image"), createUser);
router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
