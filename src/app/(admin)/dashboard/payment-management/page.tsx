// @ts-nocheck
import { getPaymentHistory } from "@/service/getPaymentHistory";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/FormatDate";
import Image from "next/image";

const PaymentHistory = async () => {
  const paymentHistory = await getPaymentHistory();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4 mx-12">Payment History</h1>
      <div className="mx-16">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profile Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentHistory.map((payment) => (
              <TableRow key={payment?.transactionId}>
                <TableCell>
                  <Image
                    src={payment?.userId?.profileImage}
                    alt={payment?.userId?.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </TableCell>
                <TableCell>{payment?.userId?.name}</TableCell>
                <TableCell>{payment?.userId?.email}</TableCell>
                <TableCell>{payment?.transactionId}</TableCell>
                <TableCell>{formatDate(payment?.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentHistory;
