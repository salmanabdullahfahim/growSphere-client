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

const FollowerDialog = ({ user }: { user: any }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <p className="text-gray-600 font-semibold cursor-pointer">
          {user?.followers.length} followers
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="py-2">Followers</DialogTitle>
          <DialogDescription>
            {user?.followers.map((follower: any) => (
              <div key={follower._id} className="flex items-center gap-2 py-1">
                <Image
                  src={follower?.profileImage}
                  alt="Follower"
                  width={40}
                  height={40}
                  className="rounded-full border border-gray-300"
                />
                <p className="font-semibold">{follower?.name}</p>
              </div>
            ))}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FollowerDialog;
