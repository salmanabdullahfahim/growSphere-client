import { getAllUser } from "@/service/getAllUser";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { TUser } from "@/types/types";

const UserManagement = async () => {
  const users = await getAllUser();

  return (
    <div className="flex justify-center items-center w-full my-24 mx-16">
      <Table>
        <TableCaption>A list of GrowSphere users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Profile Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.data.map((user: TUser) => (
            // @ts-expect-error
            <TableRow key={user._id}>
              <TableCell>
                <Image
                  src={user?.profileImage}
                  alt={`${user?.name}'s profile`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </TableCell>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.status}</TableCell>
              <TableCell>
                {user?.status === "active" ? (
                  <button className="text-sm text-gray-100 font-semibold bg-red-500 rounded-lg px-2 py-1 hover:bg-red-600">
                    Block
                  </button>
                ) : (
                  <button className="text-sm text-gray-100 font-semibold bg-green-500 rounded-lg px-2 py-1 hover:bg-green-600">
                    Unblock
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;
