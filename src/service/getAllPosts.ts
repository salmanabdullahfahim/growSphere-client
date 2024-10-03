"use server";

export const getAllPosts = async (searchTerm?: string) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/post`);
  if (searchTerm) {
    url.searchParams.append("searchTerm", searchTerm);
  }

  const res = await fetch(url, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};
