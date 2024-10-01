// @ts-nocheck

import nexiosInstance from "@/config/nexios.config";
import { SignInUser } from "@/types/types";
import { toast } from "sonner";
import Cookies from "js-cookie";

export const signInService = async (data: SignInUser) => {
  try {
    const response = await nexiosInstance.post("/auth/login", data);
    console.log(response?.data?.token);
    if (response?.data?.success === true) {
      toast.success(response?.data?.message);
      Cookies.set("accessToken", response?.data?.token);
      return true;
    } else {
      toast.error(response?.data?.message);
      return false;
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to sign in. Please try again.");
    return false;
  }
};
