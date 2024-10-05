"use server";

import { getServerNexiosInstance } from "@/config/nexios.config";
import { revalidatePath } from "next/cache";

export async function deletePost(postId: string) {
  const nexios = await getServerNexiosInstance();
  try {
    await nexios.delete(`/post/${postId}`);

    // Revalidate the post management page to reflect the changes
    revalidatePath("/dashboard/post-management");

    return { success: true, message: "Post deleted successfully" };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { success: false, message: "Failed to delete post" };
  }
}
