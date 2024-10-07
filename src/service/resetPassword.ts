"use server";

import { getServerNexiosInstance } from "@/config/nexios.config";

export async function resetPassword(
  id: string,
  token: string,
  password: string
) {
  const nexios = await getServerNexiosInstance();

  try {
    await nexios.post("/auth/reset-password", {
      id,
      token,
      password,
    });

    return { success: true };
  } catch (error) {
    // Handle error
    console.error("Password reset failed:", error);
    return { error: "Failed to reset password. Please try again." };
  }
}
