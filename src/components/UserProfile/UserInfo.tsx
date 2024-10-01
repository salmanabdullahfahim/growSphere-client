import React from "react";
import { TUser } from "@/types/types";
import Image from "next/image";
import verified from "@/assets/tick.png";
import Link from "next/link";

const UserInfo = ({ user }: { user: TUser }) => {
  return (
    <div>
      <div className="flex justify-between items-center mt-20 mx-20">
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
                <Image src={verified} alt="verified" width={22} height={22} />
              ) : (
                <Link
                  href="/verifyUser"
                  className="text-gray-600 font-semibold "
                >
                  Verify
                </Link>
              )}
            </div>
            <div className="flex justify-start items-center gap-2 px-6 text-gray-600 font-semibold pt-2">
              <p>{user?.followers.length} followers</p>
              <span>.</span>
              <p>{user?.following.length} following</p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default UserInfo;
