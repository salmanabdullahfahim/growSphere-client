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
import { ChevronDown, ChevronUp, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";

const PostCard = ({ postData }: any) => {
  const [showCommentInput, setShowCommentInput] = useState(false);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center">
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
              </div>
              <div className="ml-auto">
                <Button variant="outline">
                  <Heart />
                </Button>
              </div>
            </div>
          </CardTitle>
          <CardDescription className="text-lg font-semibold px-2 mt-3">
            {postData?.title}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src={postData?.images[0]}
            alt="Post"
            width={500}
            height={500}
            className="rounded-md"
          />
        </CardContent>
        <CardFooter>
          <div className="border-t border-gray-300 flex flex-col w-full py-4">
            <div className="flex justify-between w-full">
              <div className="flex gap-x-2">
                <Button variant="outline">
                  {postData?.upVotes}
                  <ChevronUp />
                </Button>
                <Button variant="outline">
                  {postData?.downVotes}
                  <ChevronDown />
                </Button>
              </div>
              <div>
                <Button
                  variant="outline"
                  onClick={() => setShowCommentInput(!showCommentInput)}
                >
                  💬 Comment
                </Button>
              </div>
            </div>
            {showCommentInput && (
              <div className="mt-4 flex gap-2">
                <Input placeholder="Write a comment..." className="flex-grow" />
                <Button>Submit</Button>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostCard;
