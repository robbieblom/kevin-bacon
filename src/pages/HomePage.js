import { Button, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Form, Formik } from 'Formik';
import React from 'react';
import * as yup from 'yup';
import { shallow } from 'zustand/shallow';
// import { mockResults } from "../mocks/mockResults";

import { ActorSelector } from "../components/ActorSelector";
import { useAppStore } from "../stores/AppStore";

export const HomePage = () => {
    const [setLoading, setSearched] = useAppStore((state) => [state.setLoading, state.setSearched], shallow)
    const [setSourceActor, setTargetActor] = useAppStore(state => [state.setSourceActor, state.setTargetActor], shallow)
    const setResults = useAppStore(state => state.setResults)


    const handleSubmit = () => {
        setLoading(true)
        // setTimeout(() => {
        //     // const searchResults = MovieService.getResults()
        //     const searchResults = mockResults
        //     setResults(searchResults)
        //     setLoading(false)
        //     setSearched(true)
        // }, 3000)
        MovieService.getMovie(60308)
            .then(r => console.log('rb', r))
    }

    const validationSchema = yup.object({
        actor_name: yup.string().required('Required')
            .test({
                name: 'same-value-actor',
                test: (value, ctx) => {
                    return value != ctx.parent.collaborator_name
                },
                message: 'Pick two different actors'
            }),
        collaborator_name: yup.string().required('Required')
            .test({
                name: 'same-value-collaborator',
                test: (value, ctx) => {
                    return value != ctx.parent.actor_name
                },
                message: 'Pick two different actors'
            }),
    })


    return (
        <Box sx={{ padding: '25px 50px' }}>
            <Box className='title'>
                <Typography variant='h1' sx={{ fontWeight: "bold", color: "white" }}>
                    Actor Connections
                </Typography>
                <Typography sx={{ lineHeight: 2.3, fontWeight: "bold", color: "white", mt: "10px" }}>
                    Enter two actors to see if they're connected through the movies they've made.
                    <br />
                    We'll check up to two degrees of separation based on who they've worked with.
                </Typography>
            </Box>

            <Paper variant="outlined" sx={{ maxWidth: '430px', mt: '50px', backgroundColor: 'rgba(255,255,255,1)' }}>
                <Formik
                    initialValues={{ actor_name: '', collaborator_name: '' }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <Form>
                        <Stack className='form' spacing={2} sx={{ padding: '40px' }}>
                            <ActorSelector
                                id='actor_name'
                                name='actor_name'
                                label="Actor Name"
                                sx={{ maxWidth: '350px', color: 'white' }}
                            />

                            <ActorSelector
                                id='collaborator_name'
                                name='collaborator_name'
                                label='Collaborator Name'
                                sx={{ maxWidth: '350px', color: 'white' }}
                            />

                            <Button
                                sx={{ width: '175px' }}
                                variant="contained"
                                type='submit'
                            >
                                Search
                            </Button>

                        </Stack>
                    </Form>

                </Formik>

            </Paper>

        </Box >
    )
}
