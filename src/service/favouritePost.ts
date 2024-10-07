"use server";

import { getServerNexiosInstance } from "@/config/nexios.config";

export async function favoritePost(postId: string, userId: string) {
  try {
    const nexios = await getServerNexiosInstance();

    const response = await nexios.post(`/user/favorite/${postId}`, {
      userId,
    });

    if (response.status === 200) {
      return { success: true, message: "Post favorited successfully" };
    } else {
      return { success: false, message: "Failed to favorite post" };
    }
  } catch (error) {
    console.error("Error favoriting post:", error);
    return {
      success: false,
      message: "An error occurred while favoriting the post",
    };
  }
}
