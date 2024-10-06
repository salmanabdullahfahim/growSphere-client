// @ts-nocheck
"use client";
import { useState, useCallback, useMemo, useEffect } from "react";

import useSWR from "swr";
import { Search, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import InspiringQuotesCard from "./_components/InspiringQuotesCard";
import { votePost } from "@/service/vote";
import { addComment } from "@/service/addComment";
import { PostCardSkeleton } from "./_components/PostCardSkeleton";
import PostCard from "@/components/Post/PostCard";
import TrendingCard from "./_components/TrendingCard";
import { useDebounce } from "@/hooks/debounce";
import { getAllPosts } from "@/service/getAllPosts";
import { toast } from "sonner";
import { extractClientUser } from "@/utils/extractClientuser";

const MyFeed = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const user = extractClientUser();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    data: posts,
    error,
    mutate,
  } = useSWR(
    [`/posts`, searchTerm, selectedCategory],
    () => getAllPosts(searchTerm, selectedCategory),
    { revalidateOnFocus: false }
  );

  const categories = useMemo(() => {
    if (!posts || !posts.data) return [];
    const uniqueCategories = new Set(
      posts.data.map((post: any) => post.category)
    );
    return Array.from(uniqueCategories);
  }, [posts]);

  const handleVote = useCallback(
    async (postId: string, voteType: "upvote" | "downvote") => {
      try {
        await votePost(postId, voteType, user?.id);
        mutate(); // This will trigger a revalidation of the data
        toast.success(`${voteType}ed`);
      } catch (error) {
        console.error("Error voting:", error);
      }
    },
    [user?.id, mutate]
  );

  const handleAddComment = useCallback(
    async (postId: string, content: string) => {
      try {
        const newComment = await addComment(postId, content, user.id);

        mutate();

        toast.success("Comment added successfully");
      } catch (error) {
        console.error("Error adding comment:", error);
        toast.error("Failed to add comment");
      }
    },
    [user?.id, mutate]
  );

  const handleCommentDeleted = useCallback(
    (postId: string, commentId: string) => {
      mutate(
        (currentData) => {
          if (!currentData) return currentData;
          return {
            ...currentData,
            data: currentData.data.map((post) => {
              if (post._id === postId) {
                return {
                  ...post,
                  comments: post.comments.filter((c) => c._id !== commentId),
                };
              }
              return post;
            }),
          };
        },
        false // Set to false to avoid revalidation immediately
      );
    },
    [mutate]
  );

  const handleCommentEdited = useCallback(
    (postId: string, commentId: string, newContent: string) => {
      mutate(
        (currentData) => {
          if (!currentData) return currentData;
          return {
            ...currentData,
            data: currentData.data.map((post) => {
              if (post._id === postId) {
                return {
                  ...post,
                  comments: post.comments.map((c) =>
                    c._id === commentId ? { ...c, content: newContent } : c
                  ),
                };
              }
              return post;
            }),
          };
        },
        false // Set to false to avoid revalidation immediately
      );
    },
    [mutate]
  );

  return (
    <div className="w-full flex gap-x-7">
      {/* left */}
      <div className="w-1/5 hidden md:block">
        <div className="sticky top-20 mt-20 px-6 ">
          <InspiringQuotesCard />
        </div>
      </div>
      <div className="w-full md:w-2/5 mx-auto flex flex-col gap-4 mt-8 px-3 md:px-0">
        <div className="flex gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border rounded-lg border-gray-300 pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {selectedCategory || "All Categories"}{" "}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                All Categories
              </DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {!posts && !error ? (
          <PostCardSkeleton />
        ) : error ? (
          <p className="text-2xl text-center text-red-600 mt-4">
            Error loading posts
          </p>
        ) : posts.data && posts.data.length > 0 ? (
          posts.data.map((post: any) => (
            <PostCard
              key={post._id}
              postData={post}
              onVote={handleVote}
              onAddComment={handleAddComment}
              onCommentDeleted={handleCommentDeleted}
              onCommentEdited={handleCommentEdited}
            />
          ))
        ) : (
          <p className="text-2xl text-center text-gray-600 mt-4">
            No posts found
          </p>
        )}
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
