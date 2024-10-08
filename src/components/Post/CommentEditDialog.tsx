"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { editComment } from "@/service/editComment";

const CommentEditDialog = ({
  comment,
  postId,
  onCommentEdited,
}: {
  comment: any;
  postId: string;
  onCommentEdited: (commentId: string, newContent: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setEditedContent(comment.content);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await editComment(postId, comment._id, editedContent);
      onCommentEdited(comment._id, editedContent);
      toast.success("Comment updated successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to update comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center gap-x-2 justify-start"
          onClick={handleEditClick}
        >
          <span> ✏️</span>
          Edit Comment
        </Button>
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Edit Comment</DialogTitle>
          <DialogDescription>
            Make changes to your comment below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="Edit your comment..."
            className="mb-4"
          />
          <div className="flex justify-end gap-2">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-600/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Comment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CommentEditDialog;
