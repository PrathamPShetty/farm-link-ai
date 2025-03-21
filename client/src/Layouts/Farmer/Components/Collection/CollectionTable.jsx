import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Box, Button, TextField, Typography } from "@mui/material";
export default function CollectionTable({ data, host, deleteRecord }) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Farmer</TableCell>
            <TableCell>Milk Collected</TableCell>
            <TableCell>Amount Given</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length > 0 ? (
            data.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell>{moment(row?.date).format("DD-MM-YYYY")}</TableCell>
                <TableCell>
                  <Typography>{row?.farmerId?.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{row?.collectedMilk} Liters</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">₹{row?.amountGiven}</Typography>
                  <Typography variant="caption">
                    ₹{row?.currentPrice} per liter
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button onClick={() => deleteRecord(row?._id)} color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No record found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
