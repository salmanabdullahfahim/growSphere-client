// @ts-nocheck
import FollowButton from "@/components/UserProfile/FollowButton";
import { getUserById } from "@/service/getUserById";
import { extractUser } from "@/utils/extractUser";
import Image from "next/image";
import React from "react";

const UserPage = async ({ params }: { params: { id: string } }) => {
  const user = await getUserById(params.id);
  const userData = user?.data;

  const extractedUser = extractUser();

  return (
    <div className=" pb-16 border-b-2 border-gray-200 h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mt-20 mx-20">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <Image
            src={userData?.profileImage}
            alt="profile"
            width={200}
            height={200}
            className="rounded-full border-[3px] border-gray-200"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-x-1">
              <h1 className=" text-2xl md:text-4xl font-bold px-4">
                {userData?.name}
              </h1>
            </div>
            <div className="flex justify-start items-center gap-2 px-6 pt-1">
              <p className="text-gray-600 font-semibold cursor-pointer">
                {userData?.followers.length} followers
              </p>
              <span>.</span>
              <p className="text-gray-600 font-semibold cursor-pointer ">
                {userData?.following.length} following
              </p>
            </div>
          </div>
          <div className="px-6">
            <FollowButton
              isFollowing={userData?.followers.some(
                (follower: any) => follower._id === extractedUser.id
              )}
              followingId={userData?._id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
