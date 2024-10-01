// @ts-nocheck
import UserInfo from "@/components/UserProfile/UserInfo";
import nexiosInstance from "@/config/nexios.config";
import { extractUser } from "@/utils/extractUser";

import React from "react";

const ProfilePage = async () => {
  const extractedUser = extractUser();

  const response = await nexiosInstance.get(`/user/${extractedUser?.email}`, {
    cache: "no-store",
  });
  const user = response?.data?.data;

  return (
    <div>
      <UserInfo user={user} />
    </div>
  );
};

export default ProfilePage;
