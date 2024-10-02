// @ts-nocheck

import { SignInUser } from "@/types/types";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { getClientNexiosInstance } from "@/config/nexios.config";

export const signInService = async (data: SignInUser) => {
  try {
    const clientNexiosInstance = await getClientNexiosInstance();
    const response = await clientNexiosInstance.post("/auth/login", data);

    if (response?.data?.success === true) {
      toast.success(response?.data?.message);
      Cookies.set("accessToken", response?.data?.token);
      return true;
    } else {
      toast.error(response?.data?.message);
      return false;
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to sign in. Please try again.");
    return false;
  }
};
