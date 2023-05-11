import { CircularProgress, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useAppStore } from "../stores/AppStore";

export const Loading = () => {
  const [currentDegree, movieCount] = useAppStore((state) => [
    state.currentDegree,
    state.movieCount,
  ]);

  const getLoadingText = () => {
    if (currentDegree > 1) {
      return (
        <Typography variant="h5" fontWeight={"bold"} sx={{ lineHeight: 2 }}>
          Searched {movieCount} total movies
          <br />
          Now checking for actors with {currentDegree} degrees of separation
        </Typography>
      );
    } else {
      return (
        <Typography variant="h5" fontWeight={"bold"} sx={{ lineHeight: 2 }}>
          Searched {movieCount} total movies
        </Typography>
      );
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Stack direction="column" spacing={9}>
          <CircularProgress size={150} sx={{ alignSelf: "center" }} />
          {getLoadingText()}
        </Stack>
      </Box>
    </>
  );
};
