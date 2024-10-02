// @ts-nocheck
import { Nexios } from "nexios-http";

const createNexiosInstance = async (isServer: boolean) => {
  const instance = new Nexios({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (isServer) {
    // Server-side specific configuration
    const { cookies } = await import("next/headers");
    instance.interceptors.request.use((config) => {
      const token = cookies().get("accessToken")?.value;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });
  } else {
    // Client-side specific configuration
    instance.interceptors.request.use((config) => {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });
  }

  return instance;
};

export const getServerNexiosInstance = () => createNexiosInstance(true);
export const getClientNexiosInstance = () => createNexiosInstance(false);

export const serverNexiosInstance = createNexiosInstance(true);
export const clientNexiosInstance = createNexiosInstance(false);
