import PostCard from "@/components/Post/PostCard";
import { getAllPosts } from "@/service/getAllPosts";
import React from "react";

const PostManagement = async () => {
  const posts = await getAllPosts();

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 mx-2 px-12 py-4 mt-6 sticky top-0 bg-white shadow-lg">
        All Posts in GrowSphere
      </h2>
      <div className="p-6 w-4/6 my-12 mx-auto">
        <div className="flex flex-col gap-y-6">
          {/* @ts-expect-error */}
          {posts.data.posts.map((post) => (
            <PostCard key={post._id} postData={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostManagement;
