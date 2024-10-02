import UserCard from "@/components/admin/analytics/Card";
import CountChart from "@/components/admin/analytics/CountChart";
import React from "react";

const page = () => {
  return (
    <div className="mt-12 mx-4 w-full">
      <div className="flex justify-center items-center gap-4 w-full px-12">
        <UserCard type="User" />
        <UserCard type="Sale" />
        <UserCard type="Post" />
      </div>

      <CountChart />
    </div>
  );
};

export default page;
