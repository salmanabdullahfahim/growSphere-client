"use server";

import { getServerNexiosInstance } from "@/config/nexios.config";

export const forgetPassword = async (email: string) => {
  const nexios = await getServerNexiosInstance();
  try {
    const response = await nexios.post("/auth/forget-password", { email });
    return response.data;
  } catch (error) {
    console.error("Forget password error:", error);
    throw error;
  }
};
