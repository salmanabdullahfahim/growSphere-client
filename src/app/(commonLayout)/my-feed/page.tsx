// @ts-nocheck
"use client";
import { useState, useCallback } from "react";
import useSWR from "swr";
import PostCard from "@/components/Post/PostCard";
import { Search } from "lucide-react";
import InspiringQuotesCard from "./_components/InspiringQuotesCard";
import TrendingCard from "./_components/TrendingCard";
import { useDebounce } from "@/hooks/debounce";
import { PostCardSkeleton } from "./_components/PostCardSkeleton";
import { votePost } from "@/service/vote";
import { extractClientUser } from "@/utils/extractClientuser";
import { getAllPosts } from "@/service/getAllPosts";
import { toast } from "sonner";
import { addComment } from "@/service/addComment";
import { editComment } from "@/service/editComment";

const MyFeed = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const user = extractClientUser();

  const {
    data: posts,
    error,
    mutate,
  } = useSWR([`/post`, debouncedSearchTerm], () =>
    getAllPosts(debouncedSearchTerm)
  );

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
        <div className="relative">
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
