import { Box, Button, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React from "react";
import { shallow } from "zustand/shallow";
import { MovieList } from "../components/MovieList";
import { useAppStore } from "../stores/AppStore";

export const Results = () => {
  const [sourceActor, targetActor] = useAppStore(
    (state) => [state.sourceActor, state.targetActor],
    shallow
  );
  const [sourceActorResults, targetActorResults] = useAppStore(
    (state) => [state.sourceActorResults, state.targetActorResults],
    shallow
  );
  const setSearched = useAppStore((state) => state.setSearched);
  const [setMovieCount, setCurrentDegree] = useAppStore(
    (state) => [state.setMovieCount, state.setCurrentDegree],
    shallow
  );

  const handleNewSearch = () => {
    setSearched(false);
    setMovieCount(0);
    setCurrentDegree(0);
  };

  const getSummaryText = () => {
    const sourceHasResults = Boolean(sourceActorResults.length);
    const targetHasResults = Boolean(targetActorResults.length);
    if (sourceHasResults && targetHasResults) {
      return `${sourceActor.name} and ${targetActor.name} are in each other's Top 50`;
    } else if (sourceHasResults && !targetHasResults) {
      return `${targetActor.name} is in ${sourceActor.name}'s Top 50`;
    } else if (!sourceHasResults && targetHasResults) {
      return `${sourceActor.name} is in ${targetActor.name}'s Top 50`;
    } else {
      return `${sourceActor.name} and ${targetActor.name} are not in each other's Top 50`;
    }
  };

  return (
    <>
      <Grid2
        container
        direction="column"
        spacing={4}
        sx={{
          padding: "15px 50px 0px 50px",
        }}
      >
        <Grid2>
          <Stack
            spacing={1}
            direction={"row"}
            justifyContent={"space-between"}
            flexWrap={"nowrap"}
          >
            <Typography variant="h4" fontWeight={"bold"}>
              {getSummaryText()}
            </Typography>
            <Box>
              <Button variant="outlined" size="xl" onClick={handleNewSearch}>
                Search again
              </Button>
            </Box>
          </Stack>
        </Grid2>

        <Grid2>
          <MovieList actor={sourceActor} movies={sourceActorResults} />
        </Grid2>

        <Grid2>
          <MovieList actor={targetActor} movies={targetActorResults} />
        </Grid2>
      </Grid2>
    </>
  );
};
