import { ByteTheoryTheme } from "@bytetheoryinnovations/bytetheory-ui-library";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import MovieService from "../api/movie-service";

export const MovieCard = ({ actor, movieDetails, collaborator }) => {
  console.log("rb", actor, movieDetails);
  return (
    <>
      <ByteTheoryTheme mode={"light"}>
        <Card sx={{ width: 220, minWidth: 220, height: 300 }}>
          <CardMedia
            component={"img"}
            height="194"
            image={MovieService.getPosterImageURL(movieDetails.poster_path)}
            sx={{ objectFit: "contain" }}
          />
          <CardContent style={{ padding: "10px" }}>
            <Container style={{ padding: "0px" }}>
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
