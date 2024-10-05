// @ts-nocheck
"use client";

import { getAllUser } from "@/service/getAllUser";

import React, { useEffect, useState } from "react";
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
import { changeUserStatus } from "@/service/changeUserStatus";
import UserTableSkeleton from "./_components/Skeleton";
import { extractClientUser } from "@/utils/extractClientuser";

const UserManagement = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const extractedUser = extractClientUser();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getAllUser();
        setUsers(result.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleStatusChange = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    try {
      await changeUserStatus(userId, newStatus);

      // Update the local state to reflect the change
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Failed to change user status:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full my-24 mx-20 px-6">
        <UserTableSkeleton />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full my-24 mx-20 px-6">
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
          {users.map(
            (user: TUser) =>
              // Only render the row if the user ID doesn't match the extracted user's ID
              extractedUser.id !== user._id && (
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
                    <button
                      onClick={() => handleStatusChange(user._id, user.status)}
                      className={`text-sm text-gray-100 font-semibold rounded-lg px-2 py-1 ${
                        user.status === "active"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {user.status === "active" ? "Block" : "Unblock"}
                    </button>
                  </TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;
