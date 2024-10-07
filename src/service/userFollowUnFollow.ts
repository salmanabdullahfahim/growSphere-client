"use server";

import { revalidatePath } from "next/cache";
import { getServerNexiosInstance } from "@/config/nexios.config";

export async function followUser(userId: string, followingId: string) {
  const nexios = await getServerNexiosInstance();
  try {
    const response = await nexios.post(`/user/follow/${followingId}`, {
      followerId: userId,
    });

    if (response.status !== 200) {
      throw new Error("Failed to follow user");
    }

    revalidatePath(`/user/${followingId}`);
    return { success: true };
  } catch (error) {
    console.error("Error following user:", error);
    return { success: false, error: "Failed to follow user" };
  }
}

export async function unfollowUser(userId: string, followingId: string) {
  const nexios = await getServerNexiosInstance();
  try {
    const response = await nexios.post(`/user/unfollow/${followingId}`, {
      followerId: userId,
    });

    if (response.status !== 200) {
      throw new Error("Failed to unfollow user");
    }

    revalidatePath(`/user/${followingId}`);
    return { success: true };
  } catch (error) {
    console.error("Error unfollowing user:", error);
    return { success: false, error: "Failed to unfollow user" };
  }
}
