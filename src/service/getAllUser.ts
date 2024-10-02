"use server";

import { cookies } from "next/headers";

export const getAllUser = async () => {
  const accessToken = cookies().get("accessToken");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
    cache: "no-store",
  });

  const data = await res.json();

  return data;
};
