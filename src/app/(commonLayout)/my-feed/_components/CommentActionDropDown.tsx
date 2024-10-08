// @ts-nocheck
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { EllipsisVertical, Trash2 } from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteComment } from "@/service/deleteComment";
import CommentEditDialog from "@/components/Post/CommentEditDialog";

export function CommentActionsDropdownMenu({
  postId,
  comment,
  commentId,
  onCommentDeleted,
  onCommentEdited,
}: {
  postId: string;
  commentId: string;
  comment: any;
  onCommentDeleted: (commentId: string) => void;
  onCommentEdited: (commentId: string, newContent: string) => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteComment = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteComment(postId, commentId);
      if (result.success) {
        onCommentDeleted(commentId);
        toast.success(result.message);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete comment");
    } finally {
      setIsDeleting(false);
      router.refresh();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuLabel>Comment Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <CommentEditDialog
            comment={comment}
            postId={postId}
            onCommentEdited={onCommentEdited}
          />
          <DropdownMenuItem
            className="hover:text-red-500 font-semibold cursor-pointer"
            onClick={handleDeleteComment}
            disabled={isDeleting}
          >
            <Trash2 className="mr-2 w-4 h-4 ml-2" />
            {isDeleting ? "Deleting..." : "Delete Comment"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
