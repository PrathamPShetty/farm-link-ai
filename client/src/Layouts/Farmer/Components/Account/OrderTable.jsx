import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ViewOrderDetails from "./ViewOrderDetails";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#404a3d",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function OrderTable({ orders, host, dashboard }) {
  return (
    <div>
      <TableContainer>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product</StyledTableCell>
              <StyledTableCell>Customer</StyledTableCell>
              <StyledTableCell>Total Amount</StyledTableCell>
              <StyledTableCell>Payment Method</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              {!dashboard && <StyledTableCell>Actions</StyledTableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.length > 0 ? (
              orders
                ?.slice()
                ?.reverse()
                ?.map((order, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>
                      <Typography variant="body2">
                        {order?.product?.title} - {order?.quantity}{" "}
                        {order?.product?.unitOfMeasure}
                      </Typography>
                      <Typography variant="caption">
                        {order?.product?.unit} {order?.product?.unitOfMeasure} X{" "}
                        {order?.quantity}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>{order?.customer?.name}</StyledTableCell>
                    <StyledTableCell>₹{order?.total}</StyledTableCell>
                    <StyledTableCell>{order?.paymentMethod}</StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body2">
                        Order Status : {order?.orderStatus}
                      </Typography>
                      <Typography variant="body2">
                        Payment Status : {order?.paymentStatus}
                      </Typography>
                      {order?.ratings && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            width: "100%",
                            gap: 1,
                          }}
                        >
                          <Typography variant="body2">Ratings :</Typography>
                          <Box>
                            <Rating
                              size="small"
                              name="read-only"
                              value={parseFloat(order?.ratings)}
                              readOnly
                            />
                          </Box>
                        </Box>
                      )}
                    </StyledTableCell>
                    {!dashboard && (
                      <StyledTableCell>
                        <ViewOrderDetails order={order} host={host} />
                      </StyledTableCell>
                    )}
                  </StyledTableRow>
                ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={6} align="center">
                  No orders found!
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
