"use server";

import { getServerNexiosInstance } from "@/config/nexios.config";

export async function verifyUser(userId: string) {
  const serverNexiosInstance = await getServerNexiosInstance();
  try {
    // @ts-expect-error
    const response = await serverNexiosInstance.post(`/user/verify/${userId}`);

    // @ts-expect-error
    if (response.data.statusCode === 200 && response.data.data.payment_url) {
      // @ts-expect-error
      return { success: true, payment_url: response.data.data.payment_url };
    } else {
      // @ts-expect-error
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Verification failed:", error);
    return { success: false, error: "Verification failed. Please try again." };
  }
}
