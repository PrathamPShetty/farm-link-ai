import React from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { FarmerContext } from "../../Context/Context";

export default function Result() {
  const { cropPrediction, loading } = useContext(FarmerContext);
  return (
    <Box>
      {cropPrediction && (
        <Card
          elevation={0}
          sx={{
            marginTop: 3,
            padding: 2,
            borderRadius: 2,
            background:
              "linear-gradient(to bottom right, #fffce8bd, #eddd5e99)",
            // boxShadow: 3,
          }}
        >
          {loading ? (
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <CircularProgress size={30} sx={{ color: "#404a3d" }} />{" "}
                <Typography
                  variant="body2"
                  sx={{
                    color: "#404a3d",
                  }}
                >
                  Fetching response
                </Typography>
              </Box>
            </CardContent>
          ) : (
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    color: "#404a3dd1",
                    marginBottom: 1,
                    fontWeight: "bold",
                  }}
                >
                  Predicted Crop
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    color: "#404a3d",
                    marginBottom: 1,
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {cropPrediction.predicted_crop}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    color: "#404a3dd1",
                    marginBottom: 1,
                    fontWeight: "bold",
                  }}
                >
                  Growing Tips
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    color: "#404a3d",
                    marginBottom: 1,
                    textTransform: "capitalize",
                  }}
                >
                  {cropPrediction.growing_tips}
                </Typography>
              </Box>
            </CardContent>
          )}
        </Card>
      )}
    </Box>
  );
}
