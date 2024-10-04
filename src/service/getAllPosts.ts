"use server";

import { cookies } from "next/headers";

export const getAllPosts = async (searchTerm?: string) => {
  const accessToken = cookies().get("accessToken");
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/post`);
  if (searchTerm) {
    url.searchParams.append("searchTerm", searchTerm);
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};
