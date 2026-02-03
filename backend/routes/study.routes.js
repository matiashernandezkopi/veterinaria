import express from "express";
import {
  getStudies,
  getStudyById,
  createStudy,
  updateStudy,
  deleteStudy
} from "../controllers/study.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { isProfessional } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getStudies);
router.get("/:id", getStudyById);

router.post("/", authMiddleware, isProfessional, createStudy);

router.put("/:id", authMiddleware, isProfessional, updateStudy);
router.delete("/:id", authMiddleware, isProfessional, deleteStudy);


export default router;
