import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { FarmerContext } from "../../../Context/Context";

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

export default function PostTable({ posts, host, productId }) {
  const { deleteProductFolio } = useContext(FarmerContext);
  return (
    <TableContainer>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Picture</StyledTableCell>
            <StyledTableCell>Sub Title</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts?.length > 0 ? (
            posts?.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  <img
                    src={`${host}/uploads/farmer/product/${row?.picture}`}
                    style={{ width: "100px" }}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    value={row.subTitle}
                    fullWidth
                    readOnly
                    multiline
                    rows={2}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    size="small"
                    onClick={() => deleteProductFolio(row?._id, productId)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={5} align="center">
                No posts found!
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
