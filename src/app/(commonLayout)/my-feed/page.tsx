"use client";
import { useState, useEffect } from "react";

import { getAllPosts } from "@/service/getAllPosts";
import PostCard from "@/components/Post/PostCard";
import { Search } from "lucide-react";
import InspiringQuotesCard from "./_components/InspiringQuotesCard";
import TrendingCard from "./_components/TrendingCard";
import { useDebounce } from "@/hooks/debounce";

const MyFeed = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getAllPosts(debouncedSearchTerm);
      setPosts(data.data || []);
    };
    fetchPosts();
  }, [debouncedSearchTerm]);

  return (
    <div className="w-full flex gap-x-7">
      {/* left */}
      <div className="w-1/5 hidden md:block">
        <div className="sticky top-20 mt-20 px-6 ">
          <InspiringQuotesCard />
        </div>
      </div>
      <div className="w-full md:w-2/5 mx-auto flex flex-col gap-4 mt-8 px-3 md:px-0">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded-md border-gray-300 pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        {posts.map((post: any) => (
          <PostCard key={post._id} postData={post} />
        ))}
      </div>
      {/* right */}
      <div className="w-1/5 hidden md:block">
        <div className="sticky top-20 mt-20 px-6 ">
          <TrendingCard />
        </div>
      </div>
    </div>
  );
};

export default MyFeed;
