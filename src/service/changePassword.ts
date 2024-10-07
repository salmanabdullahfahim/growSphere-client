// @ts-nocheck
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerNexiosInstance } from "@/config/nexios.config";
import { extractUser } from "@/utils/extractUser";

export async function changePassword(prevState: any, formData: FormData) {
  const nexios = await getServerNexiosInstance();
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (newPassword !== confirmPassword) {
    return { error: "Passwords do not match" };
  }
  const extractedUser = extractUser();

  try {
    await nexios.post("/auth/change-password", {
      id: extractedUser?.id,
      password: newPassword,
    });

    // Remove the accessToken cookie
    cookies().delete("accessToken");

    return { success: true };
  } catch (error) {
    return { error: "Failed to change password. Please try again." };
  }
}
