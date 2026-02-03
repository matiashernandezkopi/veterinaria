import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { isProfessional } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", authMiddleware, isProfessional, updateUser);
router.delete("/:id", authMiddleware, isProfessional, deleteUser);

export default router;
