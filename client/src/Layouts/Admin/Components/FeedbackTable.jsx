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

export default function FeedbackTable({ data }) {
  console.log(data);
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Message</TableCell>
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
                <TableCell>
                  {moment(row?.createdAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell>
                  <Typography>{row?.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{row?.phone}</Typography>
                  <Typography>{row?.email}</Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    value={row?.subject}
                    fullWidth
                    readOnly
                    rows={2}
                    multiline
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row?.message}
                    fullWidth
                    readOnly
                    rows={2}
                    multiline
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No customers found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
