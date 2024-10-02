"use server";

export const getAllPosts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};
