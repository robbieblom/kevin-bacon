import { Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { Footer } from "../../components/Footer/Footer";
import NavModule from "../../components/Navigation/NavModule";

export const GlobalLayout = ({ children }) => {
  return (
    <>
      <Container maxWidth="xl" sx={{ height: "100vh" }}>
        <Grid2
          container
          direction={"column"}
          sx={{ height: "100%" }}
          wrap="nowrap"
        >
          <Grid2
            sx={{
              position: "sticky",
              top: "0",
              zIndex: "100",
            }}
          >
            <NavModule />
          </Grid2>

          <Grid2 flexGrow={1}>{children}</Grid2>

          <Grid2 sx={{ marginBottom: "1rem" }}>
            <Footer />
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};
