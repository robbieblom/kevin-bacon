import { ByteTheoryTheme } from "@bytetheoryinnovations/bytetheory-ui-library";
import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React from "react";
import MovieService from "../api/movie-service";

export const MovieCard = ({ actor, movieDetails, collaborator }) => {
  console.log("rb", actor, movieDetails);
  return (
    <>
      <ByteTheoryTheme mode={"light"}>
        <Card sx={{ maxWidth: 220 }}>
          <CardContent style={{ padding: "10px" }}>
            <Stack
              direction="column"
              spacing={0.5}
              justifyContent="center"
              alignItems="center"
            >
              <Avatar
                src={MovieService.getPosterImageURL(movieDetails.poster_path)}
                variant="rounded"
                sx={{ height: 150, width: 150 }}
              />
            </Stack>

            <Container style={{ padding: "30px 0px 0px 0px" }}>
              <Typography>
                <span style={{ fontWeight: "bold" }}>{actor.name}</span>{" "}
                collaborated with
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  {collaborator.name}
                </span>{" "}
                in the movie
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  {movieDetails.original_title}
                </span>
              </Typography>
            </Container>
          </CardContent>
        </Card>
      </ByteTheoryTheme>
    </>
  );
};
