import PostCard from "@/components/Post/PostCard";

import { getAllPosts } from "@/service/getAllPosts";
import { Search } from "lucide-react";

import React from "react";
import TrendingCard from "./_components/TrendingCard";
import InspiringQuotesCard from "./_components/InspiringQuotesCard";

const MyFeed = async () => {
  const posts = await getAllPosts();
  // console.log(posts.data.posts);

  return (
    <div className="w-full flex gap-x-7">
      {/* left */}
      <div className="w-1/5">
        <div className="sticky top-20 mt-20 px-6">
          <InspiringQuotesCard />
        </div>
      </div>
      <div className="w-2/5 mx-auto flex flex-col gap-4 mt-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded-md border-gray-300 pl-10"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        {posts.data.posts.map((post: any) => (
          <PostCard key={post._id} postData={post} />
        ))}
      </div>
      {/* right */}
      <div className="w-1/5">
        <div className="sticky top-20 mt-20 px-6">
          <TrendingCard />
        </div>
      </div>
    </div>
  );
};

export default MyFeed;
