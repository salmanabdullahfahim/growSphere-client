"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";

interface FollowButtonProps {
  isFollowing: boolean;
  userId: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  isFollowing: initialIsFollowing,
  userId,
}) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const handleToggleFollow = async () => {
    try {
      // Here you would make an API call to follow/unfollow the user
      // const response = await fetch(`/api/follow/${userId}`, { method: 'POST' });
      // if (response.ok) {
      setIsFollowing(!isFollowing);
      // }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  return (
    <Button
      onClick={handleToggleFollow}
      className={`px-6 py-2 rounded-lg ${
        isFollowing
          ? "bg-gray-200 text-black hover:bg-gray-300"
          : "bg-green-600 text-white hover:bg-green-700"
      }`}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
