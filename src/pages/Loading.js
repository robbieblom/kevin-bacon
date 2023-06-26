import { Section } from "@bytetheoryinnovations/bytetheory-ui-library/react";
import { CircularProgress, Stack, Typography } from "@mui/material";
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
      <Section isHero={true} style={{ paddingTop: "0px" }}>
        <Stack
          direction="column"
          spacing={9}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ height: "100%" }}
        >
          <CircularProgress size={150} />
          {getLoadingText()}
        </Stack>
      </Section>
    </>
  );
};
