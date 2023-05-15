import { ByteTheoryTheme } from "@bytetheoryinnovations/bytetheory-ui-library";
import { Button, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Form, Formik } from "Formik";
import React from "react";
import * as yup from "yup";
import { shallow } from "zustand/shallow";
import { TopNMoviesSearch } from "../alg/TopNMoviesSearch";
import { ActorSelector } from "../components/ActorSelector";
// import { mockSourceResults, mockTargetResults } from "../mocks/mockResults";
import { useAppStore } from "../stores/AppStore";

export const HomePage = () => {
  const [setLoading, setSearched] = useAppStore(
    (state) => [state.setLoading, state.setSearched],
    shallow
  );
  const [setSourceActor, setTargetActor] = useAppStore(
    (state) => [state.setSourceActor, state.setTargetActor],
    shallow
  );
  const [setSourceActorResults, setTargetActorResults] = useAppStore(
    (state) => [state.setSourceActorResults, state.setTargetActorResults]
  );
  const incrementMovieCount = useAppStore((state) => state.incrementMovieCount);

  const performSearch = async (source_id, target_id) => {
    const movieCallback = (movie) => incrementMovieCount();
    const search = new TopNMoviesSearch(source_id, target_id, movieCallback);
    const results = await search.run();
    return results;
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const sourceActorResults = await performSearch(
      values.actor_id,
      values.collaborator_id
    );
    const targetActorResults = await performSearch(
      values.collaborator_id,
      values.actor_id
    );
    setSourceActorResults(sourceActorResults);
    setTargetActorResults(targetActorResults);
    // setSourceActorResults(mockSourceResults);
    // setTargetActorResults(mockTargetResults);
    setLoading(false);
    setSearched(true);
  };

  const validationSchema = yup.object({
    actor_name: yup
      .string()
      .required("Required")
      .test({
        name: "same-value-actor",
        test: (value, ctx) => {
          return ctx.parent.actor_id != ctx.parent.collaborator_id;
        },
        message: "Pick two different actors",
      }),
    actor_id: yup.string(),
    collaborator_name: yup
      .string()
      .required("Required")
      .test({
        name: "same-value-collaborator",
        test: (value, ctx) => {
          return ctx.parent.collaborator_id != ctx.parent.actor_id;
        },
        message: "Pick two different actors",
      }),
    collaborator_id: yup.string(),
  });

  return (
    <Box sx={{ padding: "25px 50px 65px 50px" }}>
      <Box className="title">
        <Typography variant="h1" fontWeight={"bold"}>
          Who's In My Top 50?
        </Typography>
        <Typography
          fontWeight={"bold"}
          color={"text.secondary"}
          sx={{
            lineHeight: 2.3,
            mt: "10px",
          }}
        >
          Enter an actor and collaborator to see if
          <br />
          We'll check up to two degrees of separation based on who they've
          worked with.
        </Typography>
      </Box>

      <ByteTheoryTheme mode={"light"}>
        <Paper
          variant="outlined"
          sx={{
            maxWidth: "430px",
            mt: "30px",
          }}
        >
          <Formik
            initialValues={{
              actor_name: "",
              actor_id: "",
              collaborator_name: "",
              collaborator_id: "",
            }}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={validationSchema}
          >
            <Form>
              <Stack className="form" spacing={2} sx={{ padding: "40px" }}>
                <ActorSelector
                  id="actor_name"
                  name="actor_name"
                  label="Actor Name"
                  sx={{ maxWidth: "350px", color: "white" }}
                  onChange={(value) => setSourceActor(value)}
                />

                <ActorSelector
                  id="collaborator_name"
                  name="collaborator_name"
                  label="Collaborator Name"
                  sx={{ maxWidth: "350px", color: "white" }}
                  onChange={(value) => setTargetActor(value)}
                />

                <Button
                  sx={{ width: "175px" }}
                  variant="contained"
                  type="submit"
                >
                  Search
                </Button>
              </Stack>
            </Form>
          </Formik>
        </Paper>
      </ByteTheoryTheme>
    </Box>
  );
};
