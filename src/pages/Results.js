import {
  Section,
  Spacer,
  useTheme,
} from "@bytetheoryinnovations/bytetheory-ui-library/react";
import { useMUIMediaQuery } from "@bytetheoryinnovations/bytetheory-ui-library/react/hooks";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { shallow } from "zustand/shallow";
import { Background } from "../components/Background";
import { MovieList } from "../components/MovieList";
import { useAppStore } from "../stores/AppStore";

export const Results = () => {
  const theme = useTheme();
  const { isSmallTablet } = useMUIMediaQuery();
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
        <Stack
          spacing={4}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexWrap={"nowrap"}
          sx={{ position: "relative" }}
        >
          <Typography variant="h4" fontWeight={"bold"}>
            {getSummaryText()}
          </Typography>
          <Button
            variant="outlined"
            onClick={handleNewSearch}
            size={isSmallTablet ? "medium" : "small"}
            sx={{ whiteSpace: "nowrap", minWidth: "max-content" }}
          >
            Search again
          </Button>
        </Stack>

        <Spacer spacing={"35px"} />

        <Box sx={{ position: "relative" }}>
          <MovieList
            actor={sourceActor}
            movies={sourceActorResults}
            collaborator={targetActor}
          />
        </Box>
      </Section>
    </>
  );
};
