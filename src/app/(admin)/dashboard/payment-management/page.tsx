import { getPaymentHistory } from "@/service/getPaymentHistory";
import React from "react";

const PaymentHistory = async () => {
  const paymentHistory = await getPaymentHistory();

  console.log(paymentHistory);

  return <div>PaymentHistory</div>;
};

export default PaymentHistory;
