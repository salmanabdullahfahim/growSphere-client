"use client";

import PostEditDialog from "@/components/Post/PostEditDialog";
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
import { deletePost } from "@/service/deletePost";
import { EllipsisVertical, Trash2 } from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";

export function PostActionsDropdownMenu({
  post,
  postId,
}: {
  post: any;
  postId: string;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePost = async () => {
    setIsDeleting(true);
    toast.promise(deletePost(postId), {
      loading: "Deleting post...",
      success: (result) => {
        setIsDeleting(false);
        return result.message;
      },
      error: (error) => {
        setIsDeleting(false);
        return error.message || "Failed to delete post";
      },
    });
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
        <DropdownMenuLabel>Post Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <PostEditDialog post={post} />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500 cursor-pointer"
            onClick={handleDeletePost}
            disabled={isDeleting}
          >
            <Trash2 className="mr-2 w-5 h-5" />
            {isDeleting ? "Deleting..." : "Delete Post"}
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
