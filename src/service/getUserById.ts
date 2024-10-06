"use server";

import { getServerNexiosInstance } from "@/config/nexios.config";

export async function getUserById(id: string) {
  const nexios = await getServerNexiosInstance();
  try {
    const response = await nexios.get(`/user/singleUser/${id}`, {
      cache: "no-store",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
}
