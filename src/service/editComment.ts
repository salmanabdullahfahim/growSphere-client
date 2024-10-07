"use server";

import { getServerNexiosInstance } from "@/config/nexios.config";

export async function editComment(
  postId: string,
  commentId: string,
  content: string
) {
  const nexios = await getServerNexiosInstance();

  try {
    const response = await nexios.put(`/post/${postId}/comments/${commentId}`, {
      content,
    });

    return response.data;
  } catch (error) {
    console.error("Error editing comment:", error);
    throw new Error("Failed to edit comment");
  }
}
