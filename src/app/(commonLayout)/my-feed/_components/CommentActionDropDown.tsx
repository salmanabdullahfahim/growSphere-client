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

export function CommentActionsDropdownMenu({
  postId,
  commentId,
  onCommentDeleted,
}: {
  postId: string;
  commentId: string;
  onCommentDeleted: (commentId: string) => void;
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
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Comment Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <h1>Edit Comment</h1>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500 cursor-pointer"
            onClick={handleDeleteComment}
            disabled={isDeleting}
          >
            <Trash2 className="mr-2 w-5 h-5" />
            {isDeleting ? "Deleting..." : "Delete Comment"}
            <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
