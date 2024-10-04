"use client";

import React from "react";
import CountChart from "./CountChart";

interface ClientSideChartProps {
  userData: number;
  postData: number;
  saleData: number;
}

const ClientSideChart: React.FC<ClientSideChartProps> = (props) => {
  return <CountChart {...props} />;
};

export default ClientSideChart;
