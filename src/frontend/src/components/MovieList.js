import { ByteTheoryTheme } from "@bytetheoryinnovations/bytetheory-ui-library";
import { Paper, Typography, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { _hexToRgb } from "../utils/utils";
import { MovieCard } from "./MovieCard";

export const MovieList = ({ actor, movies }) => {
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
            padding: "35px",
          }}
        >
          <Grid2 container justifyContent="space-evenly" spacing={4}>
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
        </Paper>
      </ByteTheoryTheme>
    </>
  );
};
