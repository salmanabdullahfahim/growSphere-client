import { TUser } from "@/types/types";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

const InfoCard = ({ user }: { user: TUser }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-wide">
            User Info
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-600">
          <p className="text-lg font-semibold py-2">🎗️ Profile: {user?.role}</p>
          <p className="text-lg font-semibold py-2">📨 Email: {user?.email}</p>
          <p className="text-lg font-semibold py-2">📞 Phone: {user?.phone}</p>
          <p className="text-lg font-semibold py-2">
            ✔️ Verified: {user?.isVerified ? "Yes" : "No"}
          </p>
          <p className="text-lg font-semibold py-1">
            📅 Joined: {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">🖊️ Edit Profile</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default InfoCard;
