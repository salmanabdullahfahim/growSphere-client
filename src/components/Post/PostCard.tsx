// @ts-nocheck
"use client";

import React, { useState } from "react";
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
import { ChevronDown, ChevronUp, Heart, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";

import PremiumContentMark from "./PremiumContentMark";
import { favoritePost } from "@/service/favouritePost";
import { extractClientUser } from "@/utils/extractClientuser";
import { toast } from "sonner";
import { PostActionsDropdownMenu } from "@/app/(commonLayout)/my-feed/_components/PostActionsDropDown";

const PostCard = ({
  postData,
  onVote,
}: {
  postData: any;
  onVote: (postId: string, voteType: "upvote" | "downvote") => Promise<void>;
}) => {
  const [showComments, setShowComments] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [isFavorite, setIsFavorite] = useState(postData.isFavorite || false);

  const user = extractClientUser();

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

  return (
    <div>
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
              <div>
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
              </div>
            </div>

            {showCommentInput && (
              <div className="mt-4 flex gap-2">
                <Input placeholder="Write a comment..." className="flex-grow" />
                <Button>Submit</Button>
              </div>
            )}
            {showComments && postData?.comments && (
              <div className="mt-4">
                {postData.comments.map((comment: any, index: number) => (
                  <div key={index} className="bg-gray-100 p-3 rounded-md mb-2">
                    <div className="flex items-center gap-2">
                      <Image
                        src={comment.commentator.profileImage}
                        alt="Commentator"
                        width={32}
                        height={32}
                        className="rounded-full border border-gray-300"
                      />
                      <div>
                        <p className="font-semibold">
                          {comment.commentator.name}
                        </p>
                      </div>
                    </div>
                    <p className=" pl-10">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostCard;
