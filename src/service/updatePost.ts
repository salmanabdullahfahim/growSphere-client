"use server";

import { getServerNexiosInstance } from "@/config/nexios.config";
import { revalidatePath } from "next/cache";

export async function updatePost(postId: string, postData: any) {
  const nexios = await getServerNexiosInstance();

  try {
    const response = await nexios.put(`/post/update-post/${postId}`, postData);
    revalidatePath("/dashboard/post-management");
    revalidatePath("/my-profile");
    revalidatePath("/my-feed");
    return {
      success: true,
      message: "Post updated successfully",
      data: response.data,
    };
  } catch (error: any) {
    console.error("Error updating post:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update post",
    };
  }
}
