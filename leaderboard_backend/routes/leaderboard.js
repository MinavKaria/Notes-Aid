import express from "express";
import {
  getOverallLeaderboard,
  getSemesterLeaderboard,
  getCurrentSemesterLeaderboard,
  getAvailableYears,
  getAvailableSemesters,
} from "../controllers/leaderboard.js";
import { verifyGoogleToken } from "../middlewares/auth.js";

const router = express.Router();

// GET /api/v1/leaderboard - Overall CGPA leaderboard for specific admission year
router.get("/", verifyGoogleToken, getOverallLeaderboard);

// GET /api/v1/leaderboard/current - Current semester leaderboard for specific admission year
router.get("/current", verifyGoogleToken, getCurrentSemesterLeaderboard);


// Helper routes for available data
// GET /api/v1/leaderboard/meta/years - Get available admission years
router.get("/meta/years", verifyGoogleToken, getAvailableYears);

// GET /api/v1/leaderboard/meta/semesters - Get available semesters for specific admission year
router.get("/meta/semesters", verifyGoogleToken, getAvailableSemesters);

// GET /api/v1/leaderboard/:semester - Semester-specific leaderboard for specific admission year
router.get("/:semester", verifyGoogleToken, getSemesterLeaderboard);


export default router;
