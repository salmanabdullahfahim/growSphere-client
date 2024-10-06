// @ts-nocheck
"use server";

import { getServerNexiosInstance } from "@/config/nexios.config";

export async function deleteComment(postId: string, commentId: string) {
  const nexios = await getServerNexiosInstance();

  try {
    const response = await nexios.delete(
      `/post/${postId}/comments/${commentId}`
    );

    if (response.status === 200) {
      return { success: true, message: "Comment deleted successfully" };
    } else {
      throw new Error("Failed to delete comment");
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete comment",
    };
  }
}
