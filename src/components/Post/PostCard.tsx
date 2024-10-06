// @ts-nocheck
"use client";

import React, { useCallback, useRef, useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import VerifiedLogo from "../UserProfile/VerifiedLogo";
import { formatDate } from "@/utils/FormatDate";
import { Button } from "../ui/button";
import {
  ChevronDown,
  ChevronUp,
  Download,
  Heart,
  MessageSquare,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useOptimistic } from "react";
import { useRouter } from "next/navigation";
import PostEditDialog from "./PostEditDialog";

import PremiumContentMark from "./PremiumContentMark";
import { favoritePost } from "@/service/favouritePost";
import { extractClientUser } from "@/utils/extractClientuser";
import { toast } from "sonner";
import { PostActionsDropdownMenu } from "@/app/(commonLayout)/my-feed/_components/PostActionsDropDown";
import { addComment } from "@/service/addComment";
import { CommentActionsDropdownMenu } from "@/app/(commonLayout)/my-feed/_components/CommentActionDropDown";

import { useReactToPrint } from "react-to-print";

const user = extractClientUser();
const PostCard = ({
  postData,
  onVote,
  onAddComment,
  onCommentDeleted,
  onCommentEdited,
}: {
  postData: any;
  onVote: (postId: string, voteType: "upvote" | "downvote") => Promise<void>;
  onAddComment: (postId: string, content: string) => Promise<void>;
  onCommentDeleted: (postId: string, commentId: string) => void;
  onCommentEdited: (
    postId: string,
    commentId: string,
    newContent: string
  ) => void;
}) => {
  const [showComments, setShowComments] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [isFavorite, setIsFavorite] = useState(postData.isFavorite || false);
  const [commentContent, setCommentContent] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isAddingComment, setIsAddingComment] = useState(false);

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    postData.comments,
    (state, newComment) => [...state, newComment]
  );

  const router = useRouter();

  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => {
      if (!componentRef.current) {
        console.error("No content to print");
        return null;
      }
      return componentRef.current;
    },
    onBeforeGetContent: () => {
      if (!componentRef.current) {
        console.error("No content to print before getting content");
        return Promise.reject("No content to print");
      }
      return Promise.resolve();
    },
    onPrintError: (error) => {
      console.error("Print failed", error);
      toast.error("Print failed. Please try again.");
    },
    onAfterPrint: () => {
      console.log("After print");
      toast.success("Printed successfully");
    },
  });

  const handleAddComment = async () => {
    if (!commentContent.trim() || !user) return;

    const optimisticComment = {
      _id: Date.now().toString(),
      content: commentContent,
      commentator: {
        _id: user.id,
        name: user.name,
        profileImage: user.profileImage,
      },
      createdAt: new Date().toISOString(),
    };

    addOptimisticComment(optimisticComment);
    setCommentContent("");

    try {
      await onAddComment(postData._id, commentContent);
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment. Please try again.");
      // Remove the optimistic comment if the server request fails
      addOptimisticComment((comments) =>
        comments.filter((c) => c._id !== optimisticComment._id)
      );
    }
  };

  const MAX_CONTENT_LENGTH = 100; // Adjust this value as needed

  const renderContent = () => {
    if (!postData?.content) return null;

    if (postData.content.length <= MAX_CONTENT_LENGTH || showFullContent) {
      return <p>{postData.content}</p>;
    }

    return (
      <>
        <p className="py-2 px-2">
          {postData.content.slice(0, MAX_CONTENT_LENGTH)}...{" "}
          <span
            className="text-gray-700 cursor-pointer hover:underline"
            onClick={() => setShowFullContent(true)}
          >
            See more
          </span>
        </p>
      </>
    );
  };

  const handleFavorite = async () => {
    try {
      const result = await favoritePost(
        postData._id,
        // @ts-expect-error
        user?.id
      );
      if (result.success) {
        setIsFavorite(!isFavorite);
        toast.success(result.message);
      }
    } catch (error) {
      console.error("Error favoriting post:", error);
      toast.error("Error favoriting post");
    }
  };

  const handleCommentDeleted = useCallback(
    (commentId: string) => {
      addOptimisticComment((comments) =>
        comments.filter((c) => c._id !== commentId)
      );
      onCommentDeleted(postData._id, commentId);
    },
    [addOptimisticComment, onCommentDeleted, postData._id]
  );

  const handleCommentEdited = useCallback(
    (commentId: string, newContent: string) => {
      addOptimisticComment((comments) =>
        comments.map((c) =>
          c._id === commentId ? { ...c, content: newContent } : c
        )
      );
      onCommentEdited(postData._id, commentId, newContent);
    },
    [addOptimisticComment, onCommentEdited, postData._id]
  );

  return (
    <div ref={componentRef}>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-x-1">
                <Image
                  src={postData?.author?.profileImage}
                  alt="Author"
                  width={50}
                  height={50}
                  className="rounded-full border border-gray-300"
                />
                <div className="flex items-start">
                  <div className="flex flex-col">
                    <h1 className=" text-md font-bold px-4 text-gray-700 hover:underline cursor-pointer">
                      {postData?.author?.name}
                    </h1>
                    <span className="text-sm text-gray-500 px-4 pt-1">
                      {formatDate(postData?.createdAt)}
                    </span>
                  </div>
                  {postData?.author?.isVerified == true && (
                    <VerifiedLogo wi={15} he={15} />
                  )}
                  {postData?.isPremium && <PremiumContentMark />}
                </div>
              </div>
              {/* @ts-expect-error */}
              {user?.id !== postData?.author?._id && (
                <div className="ml-auto">
                  <Button variant="outline" onClick={handleFavorite}>
                    <Heart fill={isFavorite ? "currentColor" : "none"} />
                  </Button>
                </div>
              )}
              {user?.id === postData?.author?._id && (
                <PostActionsDropdownMenu postId={postData._id} />
              )}
            </div>
          </CardTitle>
          <CardDescription className="text-lg font-semibold px-2 mt-3">
            {postData?.title}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderContent()}
          <Image
            src={postData?.images[0]}
            alt="Post"
            width={500}
            height={500}
            className="rounded-md pt-2"
          />
        </CardContent>
        <CardFooter>
          <div className="border-t border-gray-300 flex flex-col w-full py-4">
            <div className="flex justify-between w-full">
              <div className="flex gap-x-2">
                <Button
                  variant="outline"
                  onClick={() => onVote(postData._id, "upvote")}
                >
                  {postData.upVotes}
                  <ChevronUp />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onVote(postData._id, "downvote")}
                >
                  {postData.downVotes}
                  <ChevronDown />
                </Button>
              </div>
              <div className="flex gap-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowComments(!showComments);
                    setShowCommentInput(!showCommentInput);
                  }}
                >
                  <MessageSquare className="mr-2" />
                  Comment ({postData?.comments?.length || 0})
                </Button>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    if (componentRef.current) {
                      handlePrint();
                    } else {
                      console.error("No content to print");
                      toast.error("Unable to print. Please try again.");
                    }
                  }}
                >
                  <Download className="mr-2 w-4 h-4" />
                </Button>
              </div>
            </div>

            {showCommentInput && user && (
              <div className="mt-4 flex gap-2">
                <Input
                  placeholder="Write a comment..."
                  className="flex-grow"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                />
                <Button
                  onClick={handleAddComment}
                  disabled={isPending || isAddingComment}
                  className="bg-green-600 hover:bg-green-600/90"
                >
                  {isPending || isAddingComment ? "Adding..." : "Add Comment"}
                </Button>
              </div>
            )}
            {showComments && (
              <div className="mt-4">
                {optimisticComments.map((comment, index) => (
                  <CommentItem
                    key={comment._id || index}
                    comment={comment}
                    postData={postData}
                    onCommentDeleted={handleCommentDeleted}
                    onCommentEdited={handleCommentEdited}
                  />
                ))}
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

const CommentSkeleton = () => (
  <div className="bg-gray-100 p-3 rounded-md mb-2 animate-pulse">
    <div className="flex items-center gap-2">
      <Skeleton className="w-8 h-8 rounded-full" />
      <Skeleton className="h-4 w-24" />
    </div>
    <Skeleton className="h-4 w-full mt-2" />
  </div>
);

const CommentItem = ({
  comment,
  postData,
  onCommentDeleted,
  onCommentEdited,
}: {
  comment: any;
  postData: any;
  onCommentDeleted: (commentId: string) => void;
  onCommentEdited: (commentId: string, newContent: string) => void;
}) => (
  <div className="bg-gray-100/60 p-3 rounded-md mb-2">
    <div className="flex justify-between items-center gap-x-2">
      <div className="flex items-center gap-x-2">
        {comment.commentator?.profileImage && (
          <Image
            src={comment.commentator.profileImage}
            alt="Commentator"
            width={32}
            height={32}
            className="rounded-full border border-gray-300"
          />
        )}
        <div>
          <p className="font-semibold">{comment.commentator?.name}</p>
        </div>
      </div>
      {user?.id === comment?.commentator?._id && (
        <CommentActionsDropdownMenu
          comment={comment}
          commentId={comment._id}
          postId={postData._id}
          onCommentDeleted={() => onCommentDeleted(comment._id)}
          onCommentEdited={onCommentEdited}
        />
      )}
    </div>
    <p className="pl-10 text-sm bg-gray-200/50 rounded-md p-1 mt-2">
      {comment.content}
    </p>
  </div>
);

export default PostCard;
