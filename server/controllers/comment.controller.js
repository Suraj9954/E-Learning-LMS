import { Comment } from "../models/comment.model.js";

// Add a comment to a lecture
export const addComment = async (req, res) => {
  try {
    const { lectureId, courseId } = req.params;
    const { text } = req.body;
    const userId = req.id; // from isAuthenticated middleware

    if (!text || text.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const comment = await Comment.create({
      lectureId,
      courseId,
      userId,
      text: text.trim(),
    });

    await comment.populate("userId", "name photoUrl");

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to add comment",
    });
  }
};

// Get all comments for a lecture
export const getComments = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const comments = await Comment.find({ lectureId })
      .populate("userId", "name photoUrl")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get comments",
    });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Only allow the comment owner to delete their comment
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this comment",
      });
    }

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete comment",
    });
  }
};

// Update a comment
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.id;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Only allow the comment owner to update their comment
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this comment",
      });
    }

    comment.text = text.trim();
    await comment.save();
    await comment.populate("userId", "name photoUrl");

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update comment",
    });
  }
};
