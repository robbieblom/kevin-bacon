import { Stack, Typography } from "@mui/material";
import React from "react";
import { MovieCard } from "./MovieCard";

export const MovieList = ({ actor, movies }) => {
  return (
    <>
      <Typography variant="h4">{actor.name}</Typography>
      <Stack direction="row" alignItems={"center"} spacing={8}>
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            actor={actor}
            movieDetails={movie.movieDetails}
            collaborator={movie.targetAsCastMember}
          />
        ))}
      </Stack>
    </>
  );
};
