import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const extractClientUser = () => {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    const user = jwtDecode(accessToken);
    return user;
  }
  return null;
};
