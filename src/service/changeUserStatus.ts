"use server";

import { getServerNexiosInstance } from "@/config/nexios.config";
import { revalidatePath } from "next/cache";

export async function changeUserStatus(
  userId: string,
  newStatus: "active" | "blocked"
) {
  const nexios = await getServerNexiosInstance();

  try {
    await nexios.put(`/user/changeStatus/${userId}`, { status: newStatus });
    revalidatePath("/dashboard/users-management");
  } catch (error) {
    console.error("Error changing user status:", error);
    throw new Error("Failed to change user status");
  }
}
