"use server";

import { getServerNexiosInstance } from "@/config/nexios.config";

export async function updateUser(userData: any) {
  const serverNexiosInstance = await getServerNexiosInstance();

  try {
    const response = await serverNexiosInstance.put(
      `/user/updateProfile/${userData._id}`,
      userData
    );

    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}
