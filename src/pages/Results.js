import {
  Section,
  useTheme,
} from "@bytetheoryinnovations/bytetheory-ui-library/react";
import { Button, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React from "react";
import { shallow } from "zustand/shallow";
import { Background } from "../components/Background";
import { MovieList } from "../components/MovieList";
import { useAppStore } from "../stores/AppStore";

export const Results = () => {
  const theme = useTheme();
  const [sourceActor, targetActor] = useAppStore(
    (state) => [state.sourceActor, state.targetActor],
    shallow
  );
  const [sourceActorResults, targetActorResults] = useAppStore(
    (state) => [state.sourceActorResults, state.targetActorResults],
    shallow
  );
  const setSearched = useAppStore((state) => state.setSearched);
  const [setMovieCount] = useAppStore(
    (state) => [state.setMovieCount],
    shallow
  );

  const handleNewSearch = () => {
    setSearched(false);
    setMovieCount(0);
  };

  const getSummaryText = () => {
    const sourceHasResults = Boolean(sourceActorResults.length);
    if (sourceHasResults) {
      return `${targetActor.name} is in ${sourceActor.name}'s Top 20 Movies`;
    } else {
      return `${targetActor.name} is not in ${sourceActor.name}'s Top 20 Movies`;
    }
  };

  return (
    <>
      <Section
        backgroundComponent={<Background />}
        style={{
          paddingTop: `calc(${theme.custom.navBarHeight} + 100px)`,
          height: "100%",
        }}
      >
        <Grid2
          container
          direction="column"
          spacing={4}
          sx={{
            position: "relative", // for stacking context with background
          }}
        >
          <Grid2>
            <Stack
              spacing={8}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              flexWrap={"nowrap"}
            >
              <Typography variant="h4" fontWeight={"bold"}>
                {getSummaryText()}
              </Typography>
              <Button variant="outlined" onClick={handleNewSearch}>
                Search again
              </Button>
            </Stack>
          </Grid2>

          <Grid2>
            <MovieList
              actor={sourceActor}
              movies={sourceActorResults}
              collaborator={targetActor}
            />
          </Grid2>
        </Grid2>
      </Section>
    </>
  );
};
