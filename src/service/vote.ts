"use server";

import { getServerNexiosInstance } from "@/config/nexios.config";

type VoteType = "upvote" | "downvote";

export async function votePost(
  postId: string,
  voteType: VoteType,
  userId: string
) {
  try {
    // Get the server-side Nexios instance
    const nexios = await getServerNexiosInstance();

    console.log(postId, voteType, userId);

    // Make API request using Nexios
    const response = await nexios.post(
      `/post/${postId}/vote`,
      {
        voteType,
        userId,
      },
      { cache: "no-store" }
    );

    console.log(response.data);
    // Return the updated post data
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error voting:", error);
    throw new Error("Failed to vote");
  }
}
