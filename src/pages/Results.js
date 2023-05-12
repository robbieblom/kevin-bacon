import { Box, Button, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React from "react";
import { shallow } from "zustand/shallow";
import { ResultCard } from "../components/ResultCard";
import { useAppStore } from "../stores/AppStore";

export const Results = () => {
  const [sourceActor, targetActor] = useAppStore(
    (state) => [state.sourceActor, state.targetActor],
    shallow
  );
  const results = useAppStore((state) => state.results);
  const setSearched = useAppStore((state) => state.setSearched);
  const [setMovieCount, setCurrentDegree] = useAppStore(
    (state) => [state.setMovieCount, state.setCurrentDegree],
    shallow
  );

  const groupResults = (results) => {
    const groupedResults = [];
    const totalGroups = (results.length - 1) / 2;
    for (let group = 1; group <= totalGroups; group++) {
      const endIndex = 2 * group + 1 - 1; //subtracting 1 gives the index
      const startIndex = endIndex - 2;
      groupedResults.push(results.slice(startIndex, endIndex + 1)); //adding 1 b/c of exclusive end
    }
    return groupedResults;
  };

  const groupedResults = groupResults(results);

  const handleNewSearch = () => {
    setSearched(false);
    setMovieCount(0);
    setCurrentDegree(0);
  };

  const hasResultsView = (
    <>
      <Grid2
        container
        direction="column"
        spacing={9}
        sx={{
          padding: "35px 50px",
        }}
      >
        <Grid2>
          <Stack spacing={3}>
            <Typography variant="h4" fontWeight={"bold"}>
              {sourceActor.name} and {targetActor.name} are connected!
            </Typography>
            <Box>
              <Button variant="outlined" size="xl" onClick={handleNewSearch}>
                Search again
              </Button>
            </Box>
          </Stack>
        </Grid2>

        <Grid2>
          <Stack
            direction="row"
            justifyContent={"center"}
            alignItems={"center"}
            spacing={8}
          >
            {groupedResults.map((connection) => (
              <ResultCard
                key={`${connection[0].id}${connection[1].id}${connection[2].id}`}
                actor={connection[0]}
                movie={connection[1]}
                collaborator={connection[2]}
              />
            ))}
          </Stack>
        </Grid2>
      </Grid2>
    </>
  );

  const noResultsView = (
    <>
      <Stack
        direction="column"
        spacing={4}
        sx={{ height: "100%", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="h4">
          {sourceActor.name} and {targetActor.name} are not connected.
        </Typography>
        <Button variant="outlined" size="xl" onClick={handleNewSearch}>
          Back to Search
        </Button>
      </Stack>
    </>
  );

  if (results.length > 0) {
    return hasResultsView;
  } else {
    return noResultsView;
  }
};
