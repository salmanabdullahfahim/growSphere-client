import PremiumContentMark from "@/components/Post/PremiumContentMark";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VerifiedLogo from "@/components/UserProfile/VerifiedLogo";
import { formatDate } from "@/utils/FormatDate";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import React from "react";
import { OptionsDropdownMenu } from "./OptionsDropDown";

const PostManagementCard = ({ postData }: { postData: any }) => {
  return (
    <div className="w-3/4">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
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

              <OptionsDropdownMenu postId={postData._id} />
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
            className="rounded-md pt-2"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PostManagementCard;
