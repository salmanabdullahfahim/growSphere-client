import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const extractUser = () => {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    const user = jwtDecode(accessToken);
    return user;
  }
  return null;
};
