// @ts-nocheck
import UserCard from "@/components/admin/analytics/Card";
import ClientSideChart from "@/components/admin/analytics/ClientSideChart";

import { getAllPosts } from "@/service/getAllPosts";
import { getAllUser } from "@/service/getAllUser";
import { getPaymentHistory } from "@/service/getPaymentHistory";
import React from "react";

const page = async () => {
  const users = await getAllUser();
  const posts = await getAllPosts();
  const paymentHistory = await getPaymentHistory();

  return (
    <div className="mt-12 mx-4 w-full">
      <div className="flex justify-center items-center gap-4 w-full px-12">
        <UserCard type="User" count={users.data.length || 0} />
        <UserCard type="Post" count={posts.data.length || 0} />
        <UserCard type="Sale" count={paymentHistory?.length || 0} />
      </div>
      <div className="mt-8 w-3/4 mx-auto my-12">
        <ClientSideChart
          userData={users.data.length || 0}
          postData={posts.data.length || 0}
          saleData={paymentHistory?.length || 0}
        />
      </div>
    </div>
  );
};

export default page;
