// @ts-nocheck
"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { followUser, unfollowUser } from "@/service/userFollowUnFollow";
import { extractClientUser } from "@/utils/extractClientuser";
import { toast } from "sonner";

interface FollowButtonProps {
  isFollowing: boolean;
  followingId: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  isFollowing: initialIsFollowing,
  followingId,
}) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);
  const user = extractClientUser();

  const handleToggleFollow = async () => {
    setIsLoading(true);
    try {
      const action = isFollowing ? unfollowUser : followUser;
      const result = await action(user.id, followingId);

      if (result.success) {
        setIsFollowing(!isFollowing);
        if (isFollowing) {
          toast.success(`You have unfollowed this user`);
        } else {
          toast.success(`You are now following this user`);
        }
      } else {
        console.error("Error toggling follow status:", result.error);
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleToggleFollow}
      disabled={isLoading}
      className={`px-6 py-2 rounded-lg ${
        isFollowing
          ? "bg-gray-200 text-black hover:bg-gray-300"
          : "bg-green-600 text-white hover:bg-green-700"
      }`}
    >
      {isLoading ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
