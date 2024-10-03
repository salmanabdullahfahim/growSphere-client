// @ts-nocheck
"use server";

import { getServerNexiosInstance } from "@/config/nexios.config";
import { revalidatePath } from "next/cache";

export async function createPost(data: {
  title: string;
  content: string;
  category: string;
  isPremium: boolean;
  images: string[];
  author: string;
}) {
  const serverNexiosInstance = await getServerNexiosInstance();

  try {
    const response = await serverNexiosInstance.post("/post/create-post", data);

    if (response?.data?.success === true) {
      revalidatePath("/my-profile");
      return { success: true, message: "Post created successfully" };
    } else {
      return { success: false, message: "Failed to create post" };
    }
  } catch (error) {
    console.error("Error creating post:", error);
    return {
      success: false,
      message: "Failed to create post. Please try again.",
    };
  }
}
