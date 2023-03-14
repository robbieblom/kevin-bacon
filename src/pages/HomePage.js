import { Autocomplete, Button, Paper, TextField, Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"
import React, { useState } from 'react'
import { shallow } from 'zustand/shallow'
import { useAppStore } from "../stores/AppStore"

export const HomePage = () => {
    const [setLoading, setSearched] = useAppStore((state) => [state.setLoading, state.setSearched], shallow)
    const [setSourceActor, setTargetActor] = useAppStore(state => [state.setSourceActor, state.setTargetActor], shallow)
    const [sourceActor, targetActor] = useAppStore(state => [state.sourceActor, state.targetActor])

    const [actorValid, setActorValid] = useState(true)
    const [collaboratorValid, setCollaboratorValid] = useState(true)
    const [sourceAndTargetAreSame, setSourceAndTargetAreSame] = useState(false)

    const handleSubmit = () => {
        if (!sourceActor || !targetActor) {
            if (!sourceActor && !targetActor) {
                setActorValid(false)
                setCollaboratorValid(false)
                return
            }
            !sourceActor ? setActorValid(false) : setCollaboratorValid(false)
            return
        }
        if (sourceActor?.name == targetActor?.name) {
            setSourceAndTargetAreSame(true)
            return
        }

        setLoading(true)
        // do logic
        setTimeout(() => {
            setLoading(false)
            setSearched(true)
        }, 3000)
    }

    const getActorOptions = () => {
        return [
            { label: "Brad Pit", name: "Brad Pit" },
            { label: "Julia Roberts", name: "Julia Roberts" },
            { label: "Tom Hanks", name: "Tom Hanks" }
        ]
    }

    const getCollaboratorOptions = () => {
        return [
            { label: "Brad Pit", name: "Brad Pit" },
            { label: "Julia Roberts", name: "Julia Roberts" },
            { label: "Tom Hanks", name: "Tom Hanks" }
        ]
    }

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

            <Paper variant="outlined" sx={{ width: '430px', mt: '50px', backgroundColor: 'rgba(255,255,255,.6)' }}>
                <Stack className='form' spacing={2} sx={{ padding: '40px' }}>
                    <Autocomplete
                        sx={{ width: '350px', color: 'white' }}
                        options={getActorOptions()}
                        renderInput={(params) => (
                            <TextField
                                required
                                label="Actor Name"
                                error={!actorValid}
                                helperText={!actorValid ? 'Required' : ''}
                                {...params}
                            />
                        )}
                        onChange={(e, value) => {
                            value ? setActorValid(true) : setActorValid(false);
                            (value && value.name == targetActor?.name) ? setSourceAndTargetAreSame(true) : setSourceAndTargetAreSame(false)
                            setSourceActor(value)
                        }}
                    />

                    <Autocomplete
                        options={getCollaboratorOptions()}
                        sx={{ width: '350px' }}
                        renderInput={(params) => (
                            <TextField
                                required
                                label="Collaborator Name"
                                error={!collaboratorValid}
                                helperText={!collaboratorValid ? 'Required' : ''}
                                {...params}
                            />
                        )}
                        onChange={(e, value) => {
                            value ? setCollaboratorValid(true) : setCollaboratorValid(false);
                            (value && value.name == sourceActor?.name) ? setSourceAndTargetAreSame(true) : setSourceAndTargetAreSame(false)
                            setTargetActor(value)
                        }}
                    />

                    <Button
                        sx={{ width: '175px' }}
                        variant="contained"
                        onClick={handleSubmit}
                        type='submit'
                    >
                        Search
                    </Button>

                    {(sourceAndTargetAreSame) &&
                        <Typography color='error'>Please choose different actors</Typography>}
                </Stack>
            </Paper>

        </Box>
    )
}

