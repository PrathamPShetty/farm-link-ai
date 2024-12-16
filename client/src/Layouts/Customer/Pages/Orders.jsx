import { Box } from "@mui/material";
import React from "react";
import PageBanner from "../Banner/PageBanner";
import OrderHistory from "../Components/Account/OrderHistory";
import { useContext } from "react";
import { CustomerContext } from "../Context/Context";
import { useEffect } from "react";

export default function Orders() {
  const { viewOrders, feedback, orders, host } = useContext(CustomerContext);
  useEffect(() => {
    viewOrders();
  }, []);
  return (
    <Box>
      <Box>
        <PageBanner title="Orders" />
      </Box>
      <Box>
        <OrderHistory
          feedback={feedback}
          orders={orders.slice().reverse()}
          host={host}
        />
      </Box>
    </Box>
  );
}
