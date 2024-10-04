"use server";

import { getServerNexiosInstance } from "@/config/nexios.config";

export const getPaymentHistory = async () => {
  const nexios = await getServerNexiosInstance();
  const response = await nexios.get("/payment/history");
  return response.data;
};
