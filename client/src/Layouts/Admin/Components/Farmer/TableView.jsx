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
// import Update from "./Update";
export default function TableView({
  data,
  host,
  dashboard,
  updateFarmerStatus,
}) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: !dashboard && 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {!dashboard && <TableCell>Date</TableCell>}
            <TableCell>Farmer</TableCell>
            <TableCell> Contact</TableCell>
            {!dashboard && <TableCell>Email</TableCell>}
            {!dashboard && <TableCell>Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length > 0 ? (
            data.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: dashboard
                    ? "white"
                    : !dashboard && row?.status == "Active"
                    ? "#e8f5e9"
                    : "#ffebee",
                }}
              >
                {!dashboard && (
                  <TableCell>
                    {moment(row?.createdAt).format("DD-MM-YYYY")}
                  </TableCell>
                )}
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    {!dashboard && (
                      <Box>
                        <img
                          style={{ width: "100px" }}
                          src={`${host}/uploads/admin/getImagesFromFarmer/${row?.profile}`}
                        />
                      </Box>
                    )}

                    <Box>
                      <Box>
                        <Typography>{row?.name}</Typography>
                        <Typography>{row?.aadhaarNumber}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography>{row?.phone}</Typography>
                </TableCell>
                {!dashboard && (
                  <TableCell>
                    <Typography>{row?.email}</Typography>
                  </TableCell>
                )}
                {!dashboard && (
                  <TableCell>
                    {row?.status == "Active" ? (
                      <Button
                        onClick={() => updateFarmerStatus(row?._id, "Blocked")}
                        color="error"
                      >
                        Block
                      </Button>
                    ) : (
                      <Button
                        onClick={() => updateFarmerStatus(row?._id, "Active")}
                        color="primary"
                      >
                        Unblock
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No farmers found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
