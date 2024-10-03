import Logo from "@/components/Navbar/Logo";
import CreatePost from "@/components/Post/CreatePost";
import PostCard from "@/components/Post/PostCard";
import InfoCard from "@/components/UserProfile/InfoCard";
import UserInfo from "@/components/UserProfile/UserInfo";
import { getServerNexiosInstance } from "@/config/nexios.config";
import { createPost } from "@/service/createPost";
import { extractUser } from "@/utils/extractUser";
import Image from "next/image";

import React from "react";

const ProfilePage = async () => {
  const extractedUser = extractUser();

  const serverNexiosInstance = await getServerNexiosInstance();
  // get user details

  const response = await serverNexiosInstance.get(
    // @ts-expect-error
    `/user/${extractedUser?.email}`,
    {
      cache: "no-store",
    }
  );
  // @ts-expect-error
  const user = response?.data?.data;

  // get user posts
  const postsResponse = await serverNexiosInstance.get(
    `/post/user/${user?._id}`,
    {
      cache: "no-store",
    }
  );
  // @ts-expect-error
  const postData = postsResponse?.data?.data;

  return (
    <div>
      <div className="px-14 py-8">
        <Logo />
      </div>
      <UserInfo user={user} />

      <div className="flex items-start gap-x-6 w-full mt-6 px-12">
        <div className="w-2/6 py-10 sticky top-0 hidden md:block">
          <InfoCard user={user} />
        </div>
        <div className="w-full md:w-4/6 mt-12 mb-5">
          <div className=" flex items-center gap-x-3 my-4 px-3">
            <Image
              src={user?.profileImage}
              alt="User"
              width={50}
              height={50}
              className="rounded-full border border-gray-300"
            />
            <CreatePost user={user} createPostAction={createPost} />
          </div>
          <div className="p-6 w-full shadow-sm rounded-lg border border-gray-300 mb-3">
            <h1 className="text-2xl font-bold pl-7">My Posts</h1>
          </div>

          {/* User Post Card*/}
          <div className="flex flex-col gap-y-6 w-full md:w-4/6">
            {/* @ts-expect-error */}
            {postData?.map((post) => (
              <PostCard key={post._id} postData={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
