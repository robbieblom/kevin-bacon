import { ByteTheoryTheme } from "@bytetheoryinnovations/bytetheory-ui-library";
import { Paper, Stack, Typography, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { _hexToRgb } from "../utils/utils";
import { MovieCard } from "./MovieCard";

export const MovieList = ({ actor, movies, collaborator }) => {
  const theme = useTheme();

  const backgroundColorInRGB = _hexToRgb(theme.palette.background.default);
  const [r, g, b] = backgroundColorInRGB;

  return (
    <>
      <ByteTheoryTheme mode="dark">
        <Paper
          elevation={5}
          sx={{
            backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
            height: "540px",
            overflow: "auto",
          }}
        >
          <Stack
            direction={"column"}
            spacing={2}
            sx={{ padding: "30px", height: "100%" }}
            flexWrap={"wrap"}
          >
            <Grid2 container alignItems={"center"} spacing={4}>
              {movies.length > 0 ? (
                movies.map((movie, index) => (
                  <Grid2 key={index}>
                    <MovieCard
                      actor={actor}
                      movieDetails={movie.movieDetails}
                      collaborator={movie.targetAsCastMember}
                    />
                  </Grid2>
                ))
              ) : (
                <Grid2 flexGrow={1} sx={{ height: "100%" }}>
                  <Typography variant="body1" textAlign={"center"}>
                    No collaborations
                  </Typography>
                </Grid2>
              )}
            </Grid2>
          </Stack>
        </Paper>
      </ByteTheoryTheme>
    </>
  );
};
