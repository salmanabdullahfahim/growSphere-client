import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const extractUser = () => {
  const accessToken = cookies().get("accessToken");
  if (accessToken) {
    const user = jwtDecode(accessToken.value);
    return user;
  }
  return null;
};
