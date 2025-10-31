import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  addComment,
  getComments,
  deleteComment,
  updateComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

// Get all comments for a lecture
router.route("/:courseId/lecture/:lectureId/comments").get(isAuthenticated, getComments);

// Add a comment to a lecture
router.route("/:courseId/lecture/:lectureId/comments").post(isAuthenticated, addComment);

// Update a comment
router.route("/comment/:commentId").put(isAuthenticated, updateComment);

// Delete a comment
router.route("/comment/:commentId").delete(isAuthenticated, deleteComment);

export default router;
