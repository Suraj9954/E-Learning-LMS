import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Edit2, Send, X } from "lucide-react";
import { useSelector } from "react-redux";
import {
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from "@/features/api/commentApi";
import { toast } from "sonner";

const CommentSection = ({ courseId, lectureId }) => {
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  
  const { user } = useSelector((store) => store.auth);

  const { data, isLoading } = useGetCommentsQuery({ courseId, lectureId });
  const [addComment] = useAddCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      const response = await addComment({
        courseId,
        lectureId,
        text: commentText,
      }).unwrap();
      
      if (response.success) {
        toast.success("Comment added successfully");
        setCommentText("");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add comment");
    }
  };

  const handleUpdateComment = async (commentId) => {
    if (!editText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      const response = await updateComment({
        commentId,
        text: editText,
      }).unwrap();

      if (response.success) {
        toast.success("Comment updated successfully");
        setEditingCommentId(null);
        setEditText("");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await deleteComment(commentId).unwrap();

      if (response.success) {
        toast.success("Comment deleted successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete comment");
    }
  };

  const startEditing = (comment) => {
    setEditingCommentId(comment._id);
    setEditText(comment.text);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditText("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">
        Comments ({data?.comments?.length || 0})
      </h3>

      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} className="mb-6">
        <div className="flex gap-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.photoUrl} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex gap-2">
            <Input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {isLoading ? (
          <p className="text-gray-500">Loading comments...</p>
        ) : data?.comments?.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          data?.comments?.map((comment) => (
            <Card key={comment._id}>
              <CardContent className="pt-4">
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={comment.userId?.photoUrl}
                      alt={comment.userId?.name}
                    />
                    <AvatarFallback>
                      {comment.userId?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm">
                          {comment.userId?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(comment.createdAt)}
                        </p>
                      </div>
                      {user?._id === comment.userId?._id && (
                        <div className="flex gap-2">
                          {editingCommentId === comment._id ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={cancelEditing}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          ) : (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => startEditing(comment)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteComment(comment._id)}
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    {editingCommentId === comment._id ? (
                      <div className="mt-2 flex gap-2">
                        <Input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleUpdateComment(comment._id)}
                        >
                          Save
                        </Button>
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        {comment.text}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
