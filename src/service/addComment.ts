"use server";

import { getServerNexiosInstance } from "@/config/nexios.config";

export async function addComment(
  postId: string,
  content: string,
  commentator: string
) {
  const nexios = await getServerNexiosInstance();

  try {
    const response = await nexios.post(
      `/post/${postId}/comments`,
      {
        content,
        commentator,
      },
      { cache: "no-store" }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw new Error("Failed to add comment");
  }
}
