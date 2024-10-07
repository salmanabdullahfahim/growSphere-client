"use server";

import { cookies } from "next/headers";

export const getAllPosts = async (searchTerm?: string, category?: string) => {
  const accessToken = cookies().get("accessToken");
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/post`);

  if (searchTerm && searchTerm.trim() !== "") {
    url.searchParams.append("searchTerm", searchTerm.trim());
  }

  if (category && category !== "all") {
    url.searchParams.append("category", category);
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};
