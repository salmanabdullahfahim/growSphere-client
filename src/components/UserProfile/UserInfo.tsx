import React from "react";
import { TUser } from "@/types/types";

import Link from "next/link";
import Image from "next/image";
import VerifiedLogo from "./VerifiedLogo";

import { AvatarCirclesDemo } from "./FollowAvatar";
import EditUser from "./EditUser";
import { Button } from "../ui/button";
import FollowerDialog from "./FollowerDialog";
import FollowingDialog from "./FollowingDialog";

const UserInfo = ({ user }: { user: TUser }) => {
  return (
    <div className=" pb-16 border-b-2 border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center mt-20 mx-20">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <Image
            src={user?.profileImage}
            alt="profile"
            width={200}
            height={200}
            className="rounded-full border-[3px] border-gray-200"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-x-1">
              <h1 className=" text-2xl md:text-4xl font-bold px-4">
                {user?.name}
              </h1>
              {user?.isVerified == true ? (
                <VerifiedLogo wi={22} he={22} />
              ) : (
                <Link
                  href="/verifyUser"
                  className="text-gray-600 font-semibold "
                >
                  <Button variant="outline">Verify Now</Button>
                </Link>
              )}
            </div>
            <div className="flex justify-start items-center gap-2 px-6 pt-1">
              <FollowerDialog user={user} />
              <span>.</span>
              <FollowingDialog user={user} />
            </div>
            <AvatarCirclesDemo />
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <EditUser user={user} />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
