import { getAllPosts } from "@/service/getAllPosts";
import React from "react";
import PostManagementCard from "./_components/PostManagementCard";

const PostManagement = async () => {
  const posts = await getAllPosts();

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 mx-2 px-16 py-4 mt-6">
        All Posts in GrowSphere
      </h2>
      <div className="p-6 w-4/6 my-12 mx-auto">
        <div className="flex flex-col gap-y-6">
          {/* @ts-expect-error */}
          {posts.data.map((post) => (
            <PostManagementCard key={post._id} postData={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostManagement;
