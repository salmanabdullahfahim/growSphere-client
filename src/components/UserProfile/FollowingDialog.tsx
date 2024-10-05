import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

const FollowingDialog = ({ user }: { user: any }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <p className="text-gray-600 font-semibold cursor-pointer">
          {user?.following.length} followings
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="py-2">Followings</DialogTitle>
          <DialogDescription>
            {user?.following.map((following: any) => (
              <div key={following._id} className="flex items-center gap-2 py-1">
                <Image
                  src={following?.profileImage}
                  alt="following"
                  width={40}
                  height={40}
                  className="rounded-full border border-gray-300"
                />
                <p className="font-semibold">{following?.name}</p>
              </div>
            ))}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FollowingDialog;
